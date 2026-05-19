import { Request, Response } from "express";

import Lead from "../models/lead.model";

export const createLead = async ( req: Request, res: Response ) => {
  try {
    const { name, email, status, source } = req.body;

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

export const getAllLeads = async ( req: Request, res: Response ) => {
  try {
    const {
      status,
      source,
      search,
      sort = "latest",
      page = "1",
    } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const limit = 10;
    const currentPage = Number(page);

    const skip = (currentPage - 1) * limit;

    const sortOption =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalLeads = await Lead.countDocuments(
      query
    );

    res.status(200).json({
      success: true,

      pagination: {
        total: totalLeads,
        page: currentPage,
        totalPages: Math.ceil(
          totalLeads / limit
        ),
      },

      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
    });
  }
};