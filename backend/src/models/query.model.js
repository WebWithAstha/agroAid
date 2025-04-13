import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  query: {
    type: String, // audio / text
    required: true,
    trim: true,
  },
  isVoice: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    enum: ["en", "hi", "pa","ta"], // "en" for English, "hi" for Hindi, "pa" for Punjabi
    default: "en",
  },
  response: {
    audioUrl: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
      trim: true,
    },
  },
}, { timestamps: true });

export const Query = mongoose.model("Query", querySchema);
