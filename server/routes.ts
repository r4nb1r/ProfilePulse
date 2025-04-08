import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  createOAuth2Client, 
  generateAuthUrl, 
  getTokens, 
  setCredentials,
  claimGBP,
  optimizeGBP
} from "./google-api";
import { 
  insertBusinessProfileSchema, 
  type InsertBusinessProfile,
  type BusinessProfile
} from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";

// Define session data type to fix TypeScript errors
declare module 'express-session' {
  interface SessionData {
    tokens: any;
    isAuthenticated: boolean;
  }
}

// Session setup
const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "profile-pulse-secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === "production" },
      store: new SessionStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      })
    })
  );

  // Google OAuth route - generates authorization URL
  app.get("/api/auth/url", (req: Request, res: Response) => {
    try {
      const oauth2Client = createOAuth2Client();
      const authUrl = generateAuthUrl(oauth2Client);
      res.json({ url: authUrl });
    } catch (error) {
      console.error("Error generating auth URL:", error);
      res.status(500).json({ message: "Failed to generate authentication URL" });
    }
  });

  app.get("/api/auth/callback", async (req: Request, res: Response) => {
    try {
      const { code } = req.query;
      
      if (!code || typeof code !== "string") {
        return res.status(400).json({ message: "Authorization code is required" });
      }
      
      // Exchange the code for tokens
      const oauth2Client = createOAuth2Client();
      const tokens = await getTokens(oauth2Client, code);
      
      if (req.session) {
        req.session.tokens = tokens;
        req.session.isAuthenticated = true;
      }
      
      // Redirect to the frontend
      res.redirect("/");
    } catch (error) {
      console.error("Error in auth callback:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  app.get("/api/auth/status", (req: Request, res: Response) => {
    if (req.session && req.session.isAuthenticated) {
      res.json({ isAuthenticated: true });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });

  // Business profile routes
  app.post("/api/profiles", async (req: Request, res: Response) => {
    try {
      if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Use Zod to validate the input
      const validatedData = insertBusinessProfileSchema.parse(req.body);
      
      // For demo purposes, use a fixed userId since we don't have a real user system
      const profile = await storage.createBusinessProfile({
        ...validatedData,
        userId: 1 // Fixed user ID for demo
      });

      // In a real app, we would handle this asynchronously
      // Here we're doing it in the request for simplicity
      if (req.session.tokens) {
        try {
          const oauth2Client = createOAuth2Client();
          setCredentials(oauth2Client, req.session.tokens);
          
          // Claim the business profile
          const { locationId } = await claimGBP(
            oauth2Client, 
            profile.businessName, 
            profile.address
          );
          
          // Update the profile with location ID and change status to claimed
          await storage.updateBusinessProfileStatus(profile.id, "claimed", locationId);
          
          // Optimize the business profile
          await optimizeGBP(oauth2Client, locationId, profile);
          
          // Update status to optimized
          await storage.updateBusinessProfileStatus(profile.id, "optimized");
        } catch (error) {
          console.error("Error with Google API:", error);
          // Don't fail the request, just log the error
        }
      }

      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Error creating business profile:", error);
      res.status(500).json({ message: "Failed to create business profile" });
    }
  });

  app.get("/api/profiles", async (req: Request, res: Response) => {
    try {
      if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // For demo purposes, use a fixed userId
      const profiles = await storage.getBusinessProfiles(1);
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching business profiles:", error);
      res.status(500).json({ message: "Failed to fetch business profiles" });
    }
  });

  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      if (!req.session || !req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // For demo purposes, use a fixed userId
      const stats = await storage.getStats(1);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Test route for direct GBP claim (as specified in requirements)
  app.get("/api/test", async (req: Request, res: Response) => {
    try {
      if (!req.session || !req.session.isAuthenticated || !req.session.tokens) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const oauth2Client = createOAuth2Client();
      setCredentials(oauth2Client, req.session.tokens);
      
      const result = await claimGBP(oauth2Client, "Test Business", "123 Main St");
      res.json(result);
    } catch (error) {
      console.error("Error in test endpoint:", error);
      res.status(500).json({ message: "Test failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
