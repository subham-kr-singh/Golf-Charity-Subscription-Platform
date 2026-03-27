const validate = (schema) => {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ 
        error: 'Validation failed', 
        issues: parsed.error.issues 
      });
    }
    req.body = parsed.data;
    next();
  };
};

module.exports = validate;
