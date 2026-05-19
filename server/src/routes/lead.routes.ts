import { Router } from "express";
import { createLead, getAllLeads } from "../controllers/lead.controller";
import { protect } from "../middleware/auth.middleware";

export const LeadRouter = Router();

LeadRouter.post("/", protect, createLead);
LeadRouter.get("/", protect, getAllLeads);