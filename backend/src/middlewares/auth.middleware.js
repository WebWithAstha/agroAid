import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { User } from "../models/userModel.js";
import { forbiddenResponse, serverError, unauthorizedResponse } from "../utils/responseHandler.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;

        if (!accessToken) {
          
            
            if (!refreshToken) {
                return unauthorizedResponse(res);
            }
            try {
                const decodedRefresh = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
                const user = await User.findById(decodedRefresh.id).select("+refreshToken");
                
                if (!user || user.refreshToken !== refreshToken) {
                    return forbiddenResponse(res);
                }
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await user.generateTokens();
                await setCookies(res, newAccessToken, newRefreshToken);
                req.user = user;
                return next();
            } catch (refreshError) {
                return forbiddenResponse(res);
            }
        }
        try {
            const decoded = jwt.verify(accessToken, config.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) return forbiddenResponse(res)
            req.user = user;
            next();
        } catch (accessError) {
            return unauthorizedResponse(res);
        }
    } catch (error) {
        return serverError(res, error);
    }
};

export const setCookies = async (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: Number(config.JWT_COOKIE_EXPIRES_IN),
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: Number(config.REFRESH_COOKIE_EXPIRES_IN),
    });
};

