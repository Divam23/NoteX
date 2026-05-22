import {Router} from "express";
import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/users/routes/users.routes"
import noteRoutes from "@/modules/notes/notes.route"

const router = Router();

router.use('/auth', authRoutes);
router.use('/me', userRoutes)
router.use('/note', noteRoutes)


export default router;