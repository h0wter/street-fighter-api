import { FIGHTER } from "../models/fighter.js";
import { validateRequestBody } from "../helpers/ValidateRequestBody.js";
import { RequestError } from "../helpers/RequestError.js";

const EMAIL_REGEX = /^[a-z0-9.]+@gmail.com$/i;
const PHONE_REGEX = /^\+380\d{9}$/;
const PASSWORD_REGEX = /^.{3,}$/;
const NAME_REGEX = /^\p{L}{2,}$/u;

const isEmailValid = (email) => {
  const valid = EMAIL_REGEX.test(email);
  if (!valid) {
    return {
      error: true,
      message:
        "Email entity to create isn't valid. Only gmail.com domain addresses are allowed.",
    };
  } else {
    return { error: false, message: "" };
  }
};
const isPhoneValid = (number) => {
  const valid = PHONE_REGEX.test(number);
  if (!valid) {
    return {
      error: true,
      message:
        "Phone number entity to create isn't valid. Only +380********* format are allowed.",
    };
  } else {
    return { error: false, message: "" };
  }
};
const isPasswordValid = (password) => {
  const valid = PASSWORD_REGEX.test(password.trim());
  if (!valid) {
    return {
      error: true,
      message: "The minimum password length is 3 characters.",
    };
  } else {
    return { error: false, message: "" };
  }
};
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

const validationObject = {
  name: isValidName,
  health: isValidName,
  power: isEmailValid,
  defense: isPhoneValid,
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

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
