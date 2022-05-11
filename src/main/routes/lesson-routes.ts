import { Router } from "express";

export default (router: Router): void => {
    router.post("/lesson", (req, res) => {
        res.json({ ok: "ok" });
    });
};
