import { FIGHTER } from "../models/fighter.js";
import { validateRequestBody } from "../helpers/ValidateRequestBody.js";
import { RequestError } from "../helpers/RequestError.js";

const NAME_REGEX = /^(?! )\S{2,}$/;

const isValidName = (value) => {
  const valid = NAME_REGEX.test(value);
  if (!valid) {
    return {
      error: true,
      message:
        "The name must contain only letters and have at least 2 characters.",
    };
  } else {
    return { error: false, message: "" };
  }
};
const isHealthValid = (health) => {
  if (health < 80 || health > 120) {
    return {
      error: true,
      message: "Health must be between 80 and 120 inclusive.",
    };
  } else {
    return { error: false, message: "" };
  }
};
const isPowerValid = (power) => {
  if (power < 1 || power > 100) {
    return {
      error: true,
      message: "Power must be between 1 and 100 inclusive.",
    };
  } else {
    return { error: false, message: "" };
  }
};
const isDefenseValid = (defense) => {
  if (defense < 1 || defense > 10) {
    return {
      error: true,
      message: "Defense must be between 1 and 10 inclusive.",
    };
  } else {
    return { error: false, message: "" };
  }
};

const validationObject = {
  name: isValidName,
  health: isHealthValid,
  power: isPowerValid,
  defense: isDefenseValid,
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const endWithError = (status, message) => {
    const error = RequestError(status, message);
    res.locals.err = error;
    next();
  };

  if (!req.body.health) {
    req.body.health = 100;
  }

  const isBodyHasAllRequiredFields = validateRequestBody(req.body, FIGHTER);

  if (!isBodyHasAllRequiredFields) {
    endWithError(
      400,
      "Some fields are missing or wrong type. Required fields: name, power, defense."
    );
    return;
  }

  const entries = Object.entries(req.body);

  for (const [key, value] of entries) {
    const { error, message } = validationObject[key](value);
    if (error) {
      endWithError(400, message);
      return;
    }
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const valid = validateRequestBody(req.body, FIGHTER, false);

  if (!valid) {
    const error = RequestError(
      400,
      "You need at least one field for update request."
    );
    res.locals.err = error;
    next();
    return;
  }

  const entries = Object.entries(req.body);

  for (const [key, value] of entries) {
    const { error, message } = validationObject[key](value);
    if (error) {
      const error = RequestError(400, message);
      res.locals.err = error;
      next();
      return;
    }
  }

  next();
};

export { createFighterValid, updateFighterValid };
