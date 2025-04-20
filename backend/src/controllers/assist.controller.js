import axios from "axios";
import { config } from "../config/config.js";
import { getTranscript } from "../services/assembly.service.js";
import { callGeminiApi } from "../services/Gemini.service.js";
import { getVoice } from "../services/elevenlabs.service.js";
import { Query } from "../models/query.model.js";
import { User } from "../models/userModel.js";
import {
  successResponse,
  badRequest,
  serverError,
  notFoundResponse,
} from "../utils/responseHandler.js";

export const assistQuery = async (req, res) => {
  let { data, isVoice } = req.body;
  const inp = data;
  const user = await User.findById(req.user._id);
  try {
    if (isVoice) {
      data = await getTranscript(data,user.language);
    }
    const textResponse = await callGeminiApi(data);
    const audioUrl = await getVoice(textResponse);

    const newQuery = await Query.create({
      userId: user._id,
      query:inp,
      isVoice,
      language:user.lan,
      response: {
        audioUrl,
        text:textResponse,
      },
    })

    res
      .status(202)
      .json({ message: "Voice response!",data:newQuery, success: true });
  } catch (error) {
    console.error("Error getting response details:", error);
        return serverError(res, error);
  }
};

export const getAllQuery = async (req, res) => {
  try {
      const queries = await Query.find({userId:req.user._id})

    res
      .status(202)
      .json({ message: "Queries fetched!",data:queries, success: true });
  } catch (error) {
    console.error("Error fetching user queries:", error);
        return notFoundResponse(res, "No queries found!");
  }
};
