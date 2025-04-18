import { body } from "express-validator";

export const validateCreateCrop = [
  body("name")
    .notEmpty().withMessage("Name is required.")
    .isString().withMessage("Name must be a string."),

  body("location")
    .notEmpty().withMessage("Location is required.")
    .isString().withMessage("Location must be a string."),

  body("image")
    .isArray({ min: 1 }).withMessage("Image must be a non-empty array of URLs.")
    .custom((arr) => arr.every(url => typeof url === "string" && url.startsWith("http")))
    .withMessage("Each image must be a valid URL string."),

  body("totalQuantity")
    .notEmpty().withMessage("Total quantity is required.")
    .isNumeric().withMessage("Total quantity must be a number.")
    .custom((val) => Number(val) >= 0)
    .withMessage("Total quantity must be non-negative."),

  body("perQuintalPrice")
    .notEmpty().withMessage("Per quintal price is required.")
    .isNumeric().withMessage("Per quintal price must be a number.")
    .custom((val) => Number(val) > 0)
    .withMessage("Per quintal price must be greater than 0."),

  body("harvestDate")
    .optional()
    .isISO8601().withMessage("Harvest date must be a valid ISO8601 date."),

  body("deliveryAvailable")
    .optional()
    .isBoolean().withMessage("Delivery available must be a boolean."),

  body("description")
    .optional()
    .isString().withMessage("description  must be a String."),
];
