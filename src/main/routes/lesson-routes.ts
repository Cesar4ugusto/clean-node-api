import { adaptRoute } from "../adapters/express-route-adapter";
import { Router } from "express";
import { makeLessonController } from "../factories/lesson";

export default (router: Router): void => {
    router.post("/lesson", adaptRoute(makeLessonController()));
};
