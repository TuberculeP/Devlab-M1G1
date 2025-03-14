import { Router } from "express";
import { getAllFooBars } from "../domains/fooBar/fooBar.service";
import { authRouter } from "./auth";
import collectPointsRouter from "./collect-points.routes";
import citiesRouter from "./cities.routes";
import { adminRouter } from "./admin";
import { productsRouter } from "./products";

const router = Router();

// test route
router.get("/api/foo-bar", async (req, res) => {
  const results = await getAllFooBars();
  res.json(results);
});

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/products", productsRouter);

// collect points routes
router.use("/api/collect-points", collectPointsRouter);

// cities routes
router.use("/api/cities", citiesRouter);

export default router;
