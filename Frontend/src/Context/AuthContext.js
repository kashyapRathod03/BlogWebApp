import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const buildConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const AuthContextProvider = (props) => {
  const [activeUser, setActiveUser] = useState({});
  const [config, setConfig] = useState(buildConfig);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    const nextConfig = buildConfig();
    setConfig(nextConfig);

    if (!token) {
      setActiveUser({});
      setAuthLoading(false);
      return null;
    }

    try {
      const { data } = await axios.get("/auth/private", nextConfig);
      setActiveUser(data.user || {});
      setAuthLoading(false);
      return data.user;
    } catch (error) {
      localStorage.removeItem("authToken");
      setActiveUser({});
      setAuthLoading(false);
      return null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setActiveUser({});
    setConfig(buildConfig());
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        setActiveUser,
        config,
        setConfig,
        authLoading,
        refreshAuth,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
