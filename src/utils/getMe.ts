import * as jwt from "jsonwebtoken";

export const getMe = async (req) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.APP_SECRET);
    } catch (e) {
      throw new Error("Your session expired. Sign in again.");
    }
  }
};
