import { Router } from "express";

const localRouter = Router();

localRouter.get("/", (req, res) => {
    res.send('hello world')
});



export { localRouter };
