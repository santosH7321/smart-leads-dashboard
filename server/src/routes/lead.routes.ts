import { Router } from "express";
import { createLead } from "../controllers/lead.controller";
import { protect } from "../middleware/auth.middleware";

export const LeadRouter = Router();

LeadRouter.post("/", protect, createLead);