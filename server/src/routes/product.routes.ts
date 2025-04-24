import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validateProduct } from "../middleware/product.validation";

const router = Router();

// Protect all routes
router.use(requireAuth);

router.route("/").get(getProducts).post(validateProduct, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(validateProduct, updateProduct)
  .delete(deleteProduct);

export default router;
