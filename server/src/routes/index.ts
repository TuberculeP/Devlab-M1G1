import { Router } from "express";
import { getAllFooBars } from "../domains/fooBar/fooBar.service";
import { authRouter } from "./auth";
import collectPointsRouter from "./collect-points.routes";
import citiesRouter from "./cities.routes";

const router = Router();

// test route
router.get("/api/foo-bar", async (req, res) => {
  const results = await getAllFooBars();
  res.json(results);
});

// auth routes
router.use("/auth", authRouter);

// collect points routes
router.use("/api/collect-points", collectPointsRouter);

// cities routes
router.use("/api/cities", citiesRouter);

export default router;
