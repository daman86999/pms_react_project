/**
 * It takes a JWT token, splits it into three parts, decodes the second part, and returns the decoded
 * JSON.
 * @param token - The JWT token that you want to parse.
 * @returns The JSON payload of the JWT.
 */
export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
