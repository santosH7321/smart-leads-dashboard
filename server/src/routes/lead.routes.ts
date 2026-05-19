import { Router } from "express";
import { createLead, getAllLeads, getSingleLead, updateLead } from "../controllers/lead.controller";
import { protect } from "../middleware/auth.middleware";

export const LeadRouter = Router();

LeadRouter.post("/", protect, createLead);
LeadRouter.get("/", protect, getAllLeads);
LeadRouter.get("/:id", protect, getSingleLead);
LeadRouter.put("/:id", protect, updateLead);