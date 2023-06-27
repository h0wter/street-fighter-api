import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const data = authService.login(req.body);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(
          404,
          "The user with such credentials does not exist."
        );
      }
    } catch (err) {
      res.locals.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
