import jwt from "jsonwebtoken";

const protectedRoute = async (req, res, next) => {
  try {
    console.log(req.cookies);
    if (req.cookies.token) {
      const { token } = req.cookies;

      const decoded = jwt.verify(token, "SECRETTOKEN");

      if (decoded) {
        req.username = decoded.username;
      }

      return next();
    }
    return res
      .status(401)
      .json({ error: "Unauthorized user please login first" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: false,
      message: "Invalid Auth. Token Expired or Invalid",
    });
  }
};

export { protectedRoute };
