import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  googleTokens: text("google_tokens"), // Store OAuth tokens as JSON
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const businessProfiles = pgTable("business_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  businessName: text("business_name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  website: text("website"),
  category: text("category").default("gcid:local_business"),
  mondayOpen: text("monday_open").default("09:00"),
  mondayClose: text("monday_close").default("17:00"),
  tuesdayOpen: text("tuesday_open").default("09:00"),
  tuesdayClose: text("tuesday_close").default("17:00"),
  locationId: text("location_id"), // GBP API location ID
  status: text("status").default("pending").notNull(), // pending, claimed, optimized
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBusinessProfileSchema = createInsertSchema(businessProfiles).omit({
  id: true,
  locationId: true,
  status: true,
  createdAt: true,
});

export type InsertBusinessProfile = z.infer<typeof insertBusinessProfileSchema>;
export type BusinessProfile = typeof businessProfiles.$inferSelect;
