import express from "express";
import { authenticateUser } from "@/modules/auth/auth.controller";
import { verifyFirebaseToken } from "@/shared/middlewares/verifyFirebaseToken.middleware";

const router = express.Router();

router.route("/login").post(verifyFirebaseToken, authenticateUser);


export default router;