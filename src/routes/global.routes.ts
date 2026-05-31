import {Router} from "express";
import authRoutes from "@/modules/auth/auth.routes";
import userRoutes from "@/modules/users/routes/users.routes"
import noteRoutes from "@/modules/notes/notes.route"
import bookmarkRoutes from "@/modules/bookmarks/routes/bookmark.routes"
import commentRoutes from "@/modules/comments/routes/comment.routes"

const router = Router();

router.use('/auth', authRoutes);
router.use('/me', userRoutes)
router.use('/note', noteRoutes)
router.use('/bookmark', bookmarkRoutes)
router.use('/comment', commentRoutes)


export default router;