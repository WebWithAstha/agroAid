import { getTranscript } from "../services/assembly.service.js";
import { getVoice } from "../services/elevenlabs.service.js";
import { Query } from "../models/query.model.js";
import {
  serverError,
  notFoundResponse,
} from "../utils/responseHandler.js";
import { callGeminiApi } from "../services/geminiCrop.service.js";

export const assistQuery = async (req, res) => {
  let { data, isVoice } = req.body;
  const inp = data;
  const lan =  req.user.language
  try {
    if (isVoice) {
      data = await getTranscript(data,lan);
    }
    console.log(data)
    const textResponse = await callGeminiApi(data);
    console.log("text response : " , textResponse)
    const audioUrl = await getVoice(textResponse,lan);
    console.log(audioUrl);
    
    const newQuery = await Query.create({
      userId: req.user._id,
      query:inp,
      isVoice,
      language:lan,
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
