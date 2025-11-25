export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    const message = error.details.map((d) => d.message);
    return res.status(400).json({ success: false, error: message });
  }
  next();
};
