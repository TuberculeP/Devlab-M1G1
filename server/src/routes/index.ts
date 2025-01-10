import { Router } from "express";
import { getAllFooBars } from "../domains/fooBar/fooBar.service";
import { authRouter } from "./auth";
import { adminRouter } from "./admin";

const router = Router();

// test route
router.get("/api/foo-bar", async (req, res) => {
  const results = await getAllFooBars();
  res.json(results);
});

// auth routes
router.use("/auth", authRouter);
router.use("/admin", adminRouter);

export default router;
