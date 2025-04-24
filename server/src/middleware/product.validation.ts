import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { AppError } from "./error.middleware";

export const validateProduct = [
  // Name validation
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),

  // Description validation
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  // Keywords validation
  body("keywords")
    .isArray()
    .withMessage("Keywords must be an array")
    .custom((keywords: string[]) => {
      if (keywords.length === 0) return true;
      return keywords.every(
        (keyword) =>
          typeof keyword === "string" &&
          keyword.length >= 2 &&
          keyword.length <= 50
      );
    })
    .withMessage("Each keyword must be between 2 and 50 characters"),

  // Domain validation
  body("domain").trim().notEmpty().withMessage("Domain is required"),

  // Location validation
  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("City must be between 2 and 100 characters"),

  body("location.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Country must be between 2 and 100 characters"),

  // Price validation
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  // Validation result handler
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return next(new AppError(errorMessages.join(", "), 400));
    }
    next();
  },
];
