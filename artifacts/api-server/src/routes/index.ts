import { Router, type IRouter } from "express";
import appointmentsRouter from "./appointments";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);

export default router;
