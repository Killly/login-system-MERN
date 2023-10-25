import { Box, Modal } from "@mui/material";
import React from "react";
import styles from "./Modals.module.scss";
import AuthForm from "../AuthForm";

const Modals = ({ type, handleModalClose }) => {
  return (
    <>
      <Modal open={type === "login"} onClose={handleModalClose}>
        <Box className={styles.formContainer}>
          <AuthForm formType={type} handleModalClose={handleModalClose} />
        </Box>
      </Modal>
      <Modal open={type === "register"} onClose={handleModalClose}>
        <Box className={styles.formContainer}>
          <AuthForm formType={type} handleModalClose={handleModalClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Modals;
