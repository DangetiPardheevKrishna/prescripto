import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = await req.headers;
  console.log("token i", token);
  if (!token) {
    return res.json({ success: false, error: "Not a Authorized Login" });
  }

  //Ensure req.body exists before assigning to it

  if (!req.body) {
    req.body = {};
  }
  const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = tokenDecode.id;
  console.log("token i", token);
  next();
};

export default authUser;
