import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

/**
 * It's a custom hook that returns an object with two properties: authData and setCurrentAuthData.
 *
 * The authData property is a state object that contains the user's id.
 *
 * The setCurrentAuthData property is a function that sets the authData state object.
 *
 * The authData state object is initialized with the user's token from the cookie.
 *
 * The setCurrentAuthData function sets the user's token in the cookie and sets the authData state
 * object.
 *
 * The authData state object is set to the current object passed to the setCurrentAuthData function.
 *
 * The current object passed to the setCurrentAuthData function is an object with the user's id, token,
 * and tokenExpiration.
 *
 * The user's token is set in the cookie with the sameSite and maxAge options.
 * @returns An object with two properties: authData and setCurrentAuthData.
 */
export const useAuth = () => {
  const [setCookie] = useCookies(["token"]);
  const initialState = {
    id: null,
  };

  const [authData, setAuthData] = useState(initialState);

  const setCurrentAuthData = useCallback((current) => {
    setCookie("token", current.token, {
      sameSite: true,
      maxAge: current.tokenExpiration,
    });
    setAuthData({ id: current.id });
  }, []);

  return {
    authData,
    setCurrentAuthData,
  };
};
