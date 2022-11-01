import express from "express";
import EnvelopController from "../controllers/EnvelopController.js";

const router = express.Router();

router.get("/", EnvelopController.index);
router.get("/:id", EnvelopController.show);
router.post("/", EnvelopController.store);
router.delete("/:id", EnvelopController.destroy);
router.put("/:id", EnvelopController.update);

export default router;
