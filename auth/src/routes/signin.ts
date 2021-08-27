import express from "express";

const router = express.Router();

router.post("/api/users/signin", (request, response) => {
  response.send("I'm here too");
});

export { router as signinRouter };