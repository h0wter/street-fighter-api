export const validateRequestBody = (
  body,
  model,
  shouldHaveAllProperties = true
) => {
  const modelProperties = { ...model };
  delete modelProperties.id;

  const bodyKeys = Object.keys(body);

  if (bodyKeys.length === 0) {
    return false;
  }

  const modelKeys = Object.keys(modelProperties);
  const hasOnlyRequiredProperties = bodyKeys.every(
    (key) =>
      modelProperties.hasOwnProperty(key) &&
      typeof body[key] === typeof modelProperties[key]
  );

  if (shouldHaveAllProperties) {
    const hasAllRequiredProperties = bodyKeys.length === modelKeys.length;
    return hasOnlyRequiredProperties && hasAllRequiredProperties;
  } else {
    return hasOnlyRequiredProperties;
  }
};
