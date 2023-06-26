const responseMiddleware = (_, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.locals.data) {
    res.status(200).json(res.locals.data);
  } else if (res.locals.err) {
    const { status, message } = res.locals.err;
    res.status(status).json({ error: true, message });
  } else {
    next();
  }
};

export { responseMiddleware };
