import { NextFunction, Request, Response } from "express";
import Outreach from "../models/Outreach";
import { AppError } from "../middleware/error.middleware";

// Get all outreach campaigns for a user
export const getOutreaches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchQuery = req.query.search as string;
    const query: any = { user: req.user._id };

    if (searchQuery) {
      query.$or = [
        { "product.name": { $regex: searchQuery, $options: "i" } },
        { "product.domain": { $regex: searchQuery, $options: "i" } },
        { subreddits: { $in: [new RegExp(searchQuery, "i")] } },
      ];
    }

    const outreaches = await Outreach.find(query)
      .populate("product", "name domain")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: outreaches.length,
      data: outreaches,
    });
  } catch (error) {
    next(error);
  }
};

// Get single outreach campaign
export const getOutreach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outreach = await Outreach.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("product", "name domain");

    if (!outreach) {
      return next(new AppError("No outreach campaign found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: outreach,
    });
  } catch (error) {
    next(error);
  }
};

// Create outreach campaign
export const createOutreach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outreach = await Outreach.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: outreach,
    });
  } catch (error) {
    next(error);
  }
};

// Update outreach campaign
export const updateOutreach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outreach = await Outreach.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!outreach) {
      return next(new AppError("No outreach campaign found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: outreach,
    });
  } catch (error) {
    next(error);
  }
};

// Delete outreach campaign
export const deleteOutreach = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outreach = await Outreach.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!outreach) {
      return next(new AppError("No outreach campaign found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
