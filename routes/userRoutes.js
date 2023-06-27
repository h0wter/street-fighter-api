import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { RequestError } from "../helpers/RequestError.js";

const router = Router();

// TODO: Implement route controllers for user
router.get(
  "/",
  (_, res, next) => {
    try {
      const data = userService.getAll();
      res.locals.data = data;
    } catch (error) {
      res.locals.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const id = req.params.id.trim();
      if (!id) {
        throw RequestError(404, "Provide a valid id.");
      }

      const data = userService.getUserById(id);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(404, "User not found");
      }
    } catch (error) {
      res.locals.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    if (res.locals.err) {
      next();
      return;
    }

    try {
      const data = userService.addUser(req.body);
      res.locals.data = data;
    } catch (error) {
      res.locals.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    if (res.locals.err) {
      next();
      return;
    }

    try {
      const id = req.params.id.trim();
      if (!id) {
        throw RequestError(404, "Provide a valid id.");
      }

      const data = userService.updateUserById(id, req.body);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(404, "User not found");
      }
    } catch (error) {
      res.locals.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const id = req.params.id.trim();
      if (!id) {
        throw RequestError(404, "Provide a valid id.");
      }

      const data = userService.deleteUserById(id, req.body);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(404, "User not found");
      }
    } catch (error) {
      res.locals.err = error;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
