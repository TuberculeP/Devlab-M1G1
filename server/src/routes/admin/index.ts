import { Router } from "express";
import {
  getAdminUsers,
  updatePassword,
  createUser,
} from "../../domains/admin/adminUsers.service";
import { updateProductStatus } from "../../domains/admin/adminProducts.service";

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

adminRouter.post("/update-product-status", async (req, res) => {
  const { id, status } = req.body;
  const updatedProduct = await updateProductStatus(id, status);
  res.json(updatedProduct);
});

adminRouter.post("/create-user", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  
  try {
    const newUser = await createUser(first_name, last_name, email, password);
    res.json(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
});

export { adminRouter };
