import { Router } from "express";
import { DocController } from "./controllers/docController";
import { LoginController } from "./controllers/loginController";
import { auth } from "./middlewares/auth";

const router = Router();

/**
 * @route : login
 */
router.post("/login", LoginController.login);

/**
 * @route : Get All docs
 */
router.get("/doc", auth, DocController.getDocs);

/**
 * @route : Add doc
 */
router.post("/doc", auth, DocController.create);

/**
 * @route : Get PDF
 */
router.get("/doc/:id", auth, DocController.getDoc);

export default router;
