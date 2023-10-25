import React, { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import styles from "./Home.module.scss";
import { Modals } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector, logout, fetchUserData } from "../../redux/slices/auth";

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const [showModalType, setShowModalType] = useState(null);

  const handleLogoutClick = () => {
    if (window.confirm("Please confirm logout")) {
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch(fetchUserData());
    }
  }, []);

  return (
    <Box className={styles.container}>
      {isAuth && (
        <>
          <Typography variant="h3">You are logged in</Typography>
          <Typography variant="h3">User Email: {userEmail}</Typography>
        </>
      )}

      <Box className={styles.buttonsContainer}>
        {isAuth ? (
          <Button variant="contained" onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => setShowModalType("login")}
            >
              Log In
            </Button>
            <Button
              variant="contained"
              onClick={() => setShowModalType("register")}
            >
              Register
            </Button>
          </>
        )}

        <Modals
          type={showModalType}
          handleModalClose={() => setShowModalType(null)}
        />
      </Box>
    </Box>
  );
};

export default Home;
