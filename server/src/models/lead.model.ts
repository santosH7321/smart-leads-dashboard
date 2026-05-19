import { Schema, model } from "mongoose";

import { ILead } from "../interfaces/lead.interface";

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "lost",
      ],
      default: "new",
    },

    source: {
      type: String,
      enum: [
        "website",
        "instagram",
        "referral",
      ],
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = model<ILead>(
  "Lead",
  leadSchema
);

export default Lead;