import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import styles from "./AuthForm.module.scss";
import { useDispatch } from "react-redux";
import { login, registration } from "../../redux/slices/auth";

const AuthForm = ({ formType, handleModalClose }) => {
  const dispatch = useDispatch();
  const isRegisterFormType = formType === "register";

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(
      isRegisterFormType ? registration(values) : login(values)
    );

    if (!data.payload) {
      return alert(`${isRegisterFormType ? "Registration" : "Login"} failed!`);
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    handleModalClose();
  };

  return (
    <>
      <Typography variant="h2" className={styles.title}>
        {isRegisterFormType ? "Register" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          {...register("email", { required: "Input your Email" })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email ? "Email is required" : ""}
        />

        <TextField
          label="Password"
          type="password"
          {...register("password", { minLength: 5, required: true })}
          error={Boolean(errors.password?.message)}
          helperText={errors.password ? "Password is required" : ""}
        />

        <Button disabled={!isValid} variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AuthForm;
