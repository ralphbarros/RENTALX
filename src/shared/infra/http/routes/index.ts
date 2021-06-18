import "reflect-metadata"
import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes"
import { authenticateRoutes} from "./authenticate.routes"  
const router = Router();

router.use(categoriesRoutes);
router.use(specificationsRoutes);
router.use(usersRoutes);
router.use(authenticateRoutes);


export { router }