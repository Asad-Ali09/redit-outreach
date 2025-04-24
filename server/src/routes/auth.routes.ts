import { Router } from "express";
import {
  initiateRedditAuth,
  handleRedditCallback,
} from "../controllers/auth.controller";

const router = Router();

router.get("/reddit", initiateRedditAuth);
router.get("/reddit/callback", handleRedditCallback);

export default router;
