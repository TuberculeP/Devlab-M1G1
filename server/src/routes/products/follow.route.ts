import { Router } from "express";
import { getProductFromDigestId } from "../../domains/products/products.service";

const followRouter = Router();

followRouter.get("/:digestId", async (req, res) => {
  const { digestId } = req.params;

  const product = await getProductFromDigestId(digestId);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
  } else {
    res.json(product);
  }
});

export { followRouter };
