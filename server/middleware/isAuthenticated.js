const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log({ req });
  /* Getting the authorization header from the request. */
  const authHeader = req.get("Authorization");
  /* Checking if the authorization header is present in the request. If it is not present, it is setting
the isAuth property of the request to false and returning the next middleware. */
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  /* Splitting the authorization header into an array of two elements. The first element is the word
  "Bearer" and the second element is the token. */
  const token = authHeader.split(" ")[1];
  /* Checking if the token is present in the authorization header. If it is not present, it is setting
 the isAuth property of the request to false and returning the next middleware. */
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  /* Trying to decode the token using the jwt.verify() method. If it is successful, it is setting the
 decodedToken variable to the decoded token. If it is not successful, it is setting the isAuth
 property of the request to false and returning the next middleware. */
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  /* Checking if the decodedToken variable is present. If it is not present, it is setting the isAuth
  property of the request to false and returning the next middleware. If it is present, it is
  setting the isAuth property of the request to true and setting the userId property of the request
  to the userId property of the decoded token. It is then returning the next middleware. */
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  console.log({ decodedToken });
  req.id = decodedToken.id;
  next();
};
