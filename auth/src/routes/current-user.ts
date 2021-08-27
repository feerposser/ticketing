import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (request, response) => {
  response.send("I'm here!");
});

export { router as currentUserRouter };