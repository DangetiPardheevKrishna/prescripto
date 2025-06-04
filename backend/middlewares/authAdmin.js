import jwt from "jsonwebtoken";
const authAdmin = async (req, res, next) => {
  const { atoken } = await req.headers;
  if (!atoken) {
    return res.json({ success: false, error: "Not a Authorized Login" });
  }
  const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);
  if (!tokenDecode) {
    return res.json({ success: false, error: "Not a Authorized Login" });
  }
  console.log("token is", atoken);
  next();
};

export default authAdmin;
