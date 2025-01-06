import { Router } from "express";
import { getAdminUsers } from "../../domains/admin/adminUsers.service";

const adminRouter = Router();

adminRouter.get("/get-users", async (req, res) => {
  const results = await getAdminUsers();
  res.json(results);
});

export { adminRouter };
