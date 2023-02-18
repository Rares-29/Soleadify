import Express from "express";
import { data} from "../controllers/Extract/extract.js";
const router = Express.Router();

router.get("/extract", data);

export default router;