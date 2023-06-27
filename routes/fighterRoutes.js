import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { RequestError } from "../helpers/RequestError.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (_, res, next) => {
    try {
      const data = fighterService.getAll();
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

      const data = fighterService.getFighterById(id);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(404, "Fighter not found");
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
  createFighterValid,
  (req, res, next) => {
    if (res.locals.err) {
      next();
      return;
    }

    try {
      const data = fighterService.addFighter(req.body);
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
  updateFighterValid,
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

      const data = fighterService.updateFighterById(id, req.body);
      if (data) {
        res.locals.data = data;
      } else {
        throw RequestError(404, "Fighter not found");
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
