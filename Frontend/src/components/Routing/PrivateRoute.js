import { useEffect, useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import LoadingState from "../UI/LoadingState";

const PrivateRoute = () => {
  const token = localStorage.getItem("authToken");
  const [status, setStatus] = useState(token ? "checking" : "unauthenticated");
  const { setActiveUser, setConfig } = useContext(AuthContext);

  useEffect(() => {
    let active = true;
    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    const verify = async () => {
      const nextConfig = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axios.get("/auth/private", nextConfig);
        if (!active) return;
        setActiveUser(data.user || {});
        setConfig(nextConfig);
        setStatus("authenticated");
      } catch (error) {
        if (!active) return;
        localStorage.removeItem("authToken");
        setActiveUser({});
        setStatus("unauthenticated");
      }
    };

    verify();
    return () => {
      active = false;
    };
  }, [token, setActiveUser, setConfig]);

  if (status === "checking") {
    return (
      <div className="to-container" style={{ padding: "80px 24px" }}>
        <LoadingState message="Verifying your session..." />
      </div>
    );
  }

  return status === "authenticated" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
