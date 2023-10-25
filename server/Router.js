import { Router } from "express";
import { getUSer, login, register } from "./controllers/UserController.js";
import { authValidator } from "./helpers/validators.js";
import handleValidationError from "./middlewares/handleValidationError.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

const router = Router();

router.post("/register", authValidator, handleValidationError, register);
router.post("/login", authValidator, handleValidationError, login);
router.get("/me", isAuthenticated, getUSer);

export default router;
