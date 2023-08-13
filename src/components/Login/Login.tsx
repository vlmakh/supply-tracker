import {
  StyledForm,
  FormTitle,
  StyledField,
  Label,
  StyledErrorMsg,
  LoginButton,
  TextLink,
} from "./Login.styled";
import { Formik } from "formik";
import * as yup from "yup";
import { LoginLoader } from "components/Loader/LoginLoader";
import { Box } from "components/Base/Box";
import { t } from "i18next";
import { ICredentials, IResetForm } from "components/types";
import { useUserStore } from "utils/store";
import { FC } from "react";

let schema = yup.object().shape({
  email: yup.string().email().required(t("login.required")),
  password: yup.string().min(6).required(t("login.required")),
});

const Login: FC = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  const isProcessing = useUserStore<boolean>((state) => state.isLoading);

  const handleSubmit = (values: ICredentials, { resetForm }: IResetForm) => {
    loginUser(values, resetForm);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Box>
          <FormTitle>{t("login.login")}</FormTitle>

          <p>email</p>
          <Label htmlFor="email">
            <StyledField
              name="email"
              id="email"
              type="text"
              placeholder=" "
              autoComplete="on"
            ></StyledField>
            <StyledErrorMsg component="div" name="email" />
          </Label>

          <p>{t("login.pass")}</p>
          <Label htmlFor="password">
            <StyledField
              name="password"
              id="password"
              type="password"
              placeholder=" "
              autoComplete="off"
            ></StyledField>
            <StyledErrorMsg component="div" name="password" />
          </Label>

          <LoginButton type="submit" disabled={isProcessing}>
            {isProcessing ? `${t("buttons.wait")}` : `${t("buttons.login")}`}{" "}
            <LoginLoader isProcessing={isProcessing} />
          </LoginButton>

          <TextLink to="/signup">{t("login.signup")}</TextLink>
        </Box>
      </StyledForm>
    </Formik>
  );
};

export default Login;
