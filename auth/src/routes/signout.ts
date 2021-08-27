import express from "express";

const router = express.Router();

router.post("/api/users/signout", (request, response) => {
  response.send("I'm already here!");
});

export { router as signoutRouter };