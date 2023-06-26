import { USER } from "../models/user.js";
import { RequestError } from "../helpers/RequestError.js";
import { validateRequestBody } from "../helpers/ValidateRequestBody.js";

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
  firstName: isValidName,
  lastName: isValidName,
  email: isEmailValid,
  phoneNumber: isPhoneValid,
  password: isPasswordValid,
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const endWithError = (status, message) => {
    const error = RequestError(status, message);
    res.locals.err = error;
    next();
  };

  const isBodyHasAllRequiredFields = validateRequestBody(req.body, USER);

  if (!isBodyHasAllRequiredFields) {
    endWithError(
      400,
      "Some fields are missing or wrong type. Required fields: firstName, lastName, email, phoneNumber, password. Additional fields are not allowed."
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

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const valid = validateRequestBody(req.body, USER, false);

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

export { createUserValid, updateUserValid };
