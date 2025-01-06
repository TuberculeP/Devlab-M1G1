import { Router } from "express";
import {
  getAdminUsers,
  updatePassword,
} from "../../domains/admin/adminUsers.service";

const adminRouter = Router();

adminRouter.get("/get-users", async (req, res) => {
  const results = await getAdminUsers();
  res.json(results);
});

adminRouter.post("/update-password", async (req, res) => {
  const { user_id, password } = req.body;
  await updatePassword(user_id, password);
  res.json({ message: "Password updated" });
});

export { adminRouter };
