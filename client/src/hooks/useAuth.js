import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";

export const useAuth = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const initialState = {
    id: null,
    token: cookies.token ? { token: cookies.token } : null,
    tokenExpiration: null,
  };

  const [authData, setAuthData] = useState(initialState);

  const setCurrentAuthData = useCallback((current) => {
    console.log({ current });
    setCookie("token", current.token);
    setAuthData(current);
  }, []);

  return {
    authData,
    setCurrentAuthData,
  };
};
