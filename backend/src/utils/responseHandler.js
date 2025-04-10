export const successResponse = (res, data = {}, message = "Request successful", status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res, error = "Something went wrong", status = 500) => {
    return res.status(status).json({
        success: false,
        message: typeof error === "string" ? error : error.message,
    });
};

export const badRequest = (res, message = "Bad request") => {
    return res.status(400).json({
        success: false,
        message,
    });
};

export const unauthorizedResponse = (res, message = "Unauthorized access") => {
    return res.status(401).json({
        success: false,
        message,
    });
};

export const forbiddenResponse = (res, message = "Forbidden: Access denied") => {
    return res.status(403).json({
        success: false,
        message,
    });
};

export const validationError = (res, errors = {}, message = "Validation failed") => {
    return res.status(422).json({
        success: false,
        message,
        errors,
    });
};

export const notFoundResponse = (res, message = "Resource not found") => {
    return res.status(404).json({
        success: false,
        message,
    });
};

export const serverError = (res, error = "Internal server error") => {
    console.error("Server Error:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
    });
};


