import { 
  users, type User, type InsertUser,
  businessProfiles, type BusinessProfile, type InsertBusinessProfile
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserGoogleTokens(userId: number, tokens: string): Promise<void>;
  
  getBusinessProfiles(userId: number): Promise<BusinessProfile[]>;
  getBusinessProfile(id: number): Promise<BusinessProfile | undefined>;
  createBusinessProfile(profile: InsertBusinessProfile): Promise<BusinessProfile>;
  updateBusinessProfileStatus(id: number, status: string, locationId?: string): Promise<void>;
  
  getStats(userId: number): Promise<{ total: number; optimized: number; pending: number; }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private businessProfiles: Map<number, BusinessProfile>;
  private userIdCounter: number;
  private profileIdCounter: number;

  constructor() {
    this.users = new Map();
    this.businessProfiles = new Map();
    this.userIdCounter = 1;
    this.profileIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id, googleTokens: null };
    this.users.set(id, user);
    return user;
  }

  async updateUserGoogleTokens(userId: number, tokens: string): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.googleTokens = tokens;
      this.users.set(userId, user);
    }
  }

  async getBusinessProfiles(userId: number): Promise<BusinessProfile[]> {
    return Array.from(this.businessProfiles.values()).filter(
      (profile) => profile.userId === userId
    );
  }

  async getBusinessProfile(id: number): Promise<BusinessProfile | undefined> {
    return this.businessProfiles.get(id);
  }

  async createBusinessProfile(insertProfile: InsertBusinessProfile): Promise<BusinessProfile> {
    const id = this.profileIdCounter++;
    const now = new Date();
    
    const profile: BusinessProfile = {
      ...insertProfile,
      id,
      status: "pending",
      locationId: null,
      createdAt: now
    };
    
    this.businessProfiles.set(id, profile);
    return profile;
  }

  async updateBusinessProfileStatus(id: number, status: string, locationId?: string): Promise<void> {
    const profile = await this.getBusinessProfile(id);
    if (profile) {
      profile.status = status;
      if (locationId) {
        profile.locationId = locationId;
      }
      this.businessProfiles.set(id, profile);
    }
  }

  async getStats(userId: number): Promise<{ total: number; optimized: number; pending: number; }> {
    const profiles = await this.getBusinessProfiles(userId);
    
    return {
      total: profiles.length,
      optimized: profiles.filter(p => p.status === "optimized").length,
      pending: profiles.filter(p => p.status === "pending").length
    };
  }
}

export const storage = new MemStorage();
