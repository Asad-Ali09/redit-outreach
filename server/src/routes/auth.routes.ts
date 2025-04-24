import { Router } from "express";
import {
  initiateRedditAuth,
  handleRedditCallback,
  devLogin,
} from "../controllers/auth.controller";

const router = Router();

router.get("/dev-login", devLogin);
router.get("/reddit", initiateRedditAuth);
router.get("/reddit/callback", handleRedditCallback);

export default router;
