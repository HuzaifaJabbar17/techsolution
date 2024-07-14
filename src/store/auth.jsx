import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const AuthorizationToken = `Bearer ${token}`;

  const storeTokenInLocalStorage = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  const IsLoggedIn = !!token;
  console.log(`isLoggedIn ${IsLoggedIn}`);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        console.log(data.userData);
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(`error from fetching data ${error}`);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLocalStorage,
        LogoutUser,
        IsLoggedIn,
        user,
        AuthorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// created a custom hook ---> useAuth
export const useAuth = () => {
  const authCOntextValue = useContext(AuthContext);
  if (!authCOntextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authCOntextValue;
};

// from here storeTokenInLocalStorage can be accessed to any children
