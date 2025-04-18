import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    disease: {
      type: String,
      required: true,
      trim: true,
    },
    cropName: {
      type: String,
      default:"Sample Crop",
      required: true,
      trim: true,
    },
    scientificName: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    similarImages: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],
    preventions: [
      {
        type: String,
        trim: true,
      },
    ],
    treatment: {
      organic: [
        {
          type: String,
          trim: true,
        },
      ],
      chemical: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    severity: {
      type: Number,
      min: 0,
      max: 1,
    },
    language: {
      type: String,
      enum: ["en", "hi", "pa"],
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

export const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
