import { Navigate, Outlet } from "react-router-dom";
import UserChatComponent from "./user/UserChatComponent";
import { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import axios from "axios";

const ProtectedRoutesComponent = ({ admin }) => {
  const [isAuth, setIsAuth] = useState(); // Set default state to undefined

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/get-token`
        );
        if (data.token) {
          setIsAuth(data.token); // Set the token as the authentication state
        } else {
          setIsAuth(null); // Set null if no token is present
        }
      } catch (error) {
        setIsAuth(null); // Set null in case of an error
      }
    };
    fetchToken();
  }, []);

  // If still fetching the token, show the loading state
  if (isAuth === undefined) return <LoginPage />;

  // Logic for protected route based on user and admin status
  if (isAuth) {
    if (admin && isAuth === "admin") {
      return <Outlet />; // Render the admin route
    } else if (!admin) {
      return (
        <>
          <UserChatComponent /> {/* Render user chat if not admin */}
          <Outlet />
        </>
      );
    } else {
      console.log("You are not authorized to access this page");
      return <Navigate to="/login" />; // If the user is not admin but trying to access admin route
    }
  } else {
    console.log("You are not authenticated to access this page");
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
};

export default ProtectedRoutesComponent;
