import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import * as usersApi from "../api/users";
import * as api from "../api";
import config from "../config.json";

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
  const { loading, token, user, ready, error } = useAuth();
  return { loading, token, user, ready, error };
};

export const useLogin = () => {
  const { login } = useAuth();
  return login;
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const setSession = useCallback((token) => {
    const { exp } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    setReady(stillValid);
  }, []);

  useEffect(() => {
    setReady(Boolean(token));
    api.setAuthToken(token);
    if (token) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
    }
  }, [token]);

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(false);
        setError("");
        const { token, user } = await usersApi.login(email, password);
        setSession(token);
        setUser(user);
        return true;
      } catch (error) {
        console.error(error);
        setError("Login failed, try again");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null);
    setUser(null);
  }, [setSession]);

  const value = useMemo(
    () => ({
      token,
      user,
      ready,
      error,
      loading,
      login,
      logout,
    }),
    [token, user, error, loading, login, logout, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
