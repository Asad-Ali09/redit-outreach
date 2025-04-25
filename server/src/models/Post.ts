import mongoose, { Document, Schema } from "mongoose";
import { IOutreach } from "./Outreach";

export interface IPost extends Document {
  title: string;
  text: string;
  author: string;
  date: Date;
  subreddit: string;
  url: string;
  outreach: IOutreach["_id"];
  post_id: string;
  canSolve: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    subreddit: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    outreach: {
      type: Schema.Types.ObjectId,
      ref: "Outreach",
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    canSolve: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
PostSchema.index({ outreach: 1 });
PostSchema.index({ subreddit: 1 });
PostSchema.index({ date: -1 });
PostSchema.index({ post_id: 1 }, { unique: true });
PostSchema.index({ url: 1 }, { unique: true });
PostSchema.index({ outreach: 1, author: 1 });

export default mongoose.model<IPost>("Post", PostSchema);
