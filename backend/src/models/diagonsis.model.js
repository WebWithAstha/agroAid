import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cropName: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true, 
  },
  similarImages:[{String}],
  diagnosisResult: {
    disease: {
      type: String,
      required: true,
      trim: true,
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 100, // in case you're using an AI model that returns confidence %
    },
  },
  solution: {
    type: String,
    required: true,
    trim: true,
  },
  additionalTips: {
    type: String,
    default: "",
    trim: true,
  },
  language: {
    type: String,
    enum: ["en", "hi", "pa"],
    default: "en",
  },

}, { timestamps: true });

export const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
