import express from "express";
import TransactionController from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/", TransactionController.index);
router.get("/:id", TransactionController.show);
router.post("/:fromId/transfer/:toId", TransactionController.transfer);

export default router;
