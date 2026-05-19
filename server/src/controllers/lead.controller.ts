import { Request, Response } from "express";

import Lead from "../models/lead.model";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, status, source } =
      req.body;

    if (!name || !email || !source) {
      return res.status(400).json({
        message:
          "Name, email and source are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user?.userId,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
    });
  }
};