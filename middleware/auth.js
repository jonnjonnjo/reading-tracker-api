const authCheck = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }
  next();
};

module.exports = authCheck;
