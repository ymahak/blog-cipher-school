import  express  from "express";
import { LoginController, RegisterController,forgotPasswordController,updateProfileController } from "../controllers/authController.js";
import { requireSignIn } from "../Middleware/authMiddleware.js";
import  Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/forgotpassword", forgotPasswordController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

  router.put("/profile", requireSignIn, updateProfileController);

export default router;