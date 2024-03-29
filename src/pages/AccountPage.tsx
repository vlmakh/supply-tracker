import { FC, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box } from "components/Base/Box";
import { MainWrap } from "components/Container/Container.styled";
import Modal from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import { FormUserName } from "components/FormAccount/FormUserName";
import { FormUserPass } from "components/FormAccount/FormUserPass";
import { MdOutlineArrowBack } from "react-icons/md";
import {
  BackLink,
  FormStyled,
  Label,
  Input,
  FormTitle,
  FormButton,
} from "components/FormAccount/FormAccount.styled";
import { Formik } from "formik";
import { t } from "i18next";
import { useUserStore } from "utils/store";

type Props = {
  setCurrentLang: (x: string) => void;
};

const AccountPage: FC<Props> = ({ setCurrentLang }) => {
  const currentLang = t("lang").split("-")[0];

  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/tasks/uncompleted");

  const handleLangSubmit = (values: { lang: string }) => {
    setCurrentLang(values.lang);
  };

  return (
    <>
      {!user.email && <Navigate to="/" />}

      <MainWrap>
        <BackLink to={backLink.current}>
          <MdOutlineArrowBack size="24" />
          {t("account.toTasks")}
        </BackLink>

        <Box p="16px 16px 32px" borderTop="1px solid lightgray">
          <h4>{user.name}</h4>
          <p>{t("account.supply")}</p>
        </Box>

        <FormUserName />

        <FormUserPass />

        <Formik
          onSubmit={handleLangSubmit}
          initialValues={{
            lang: currentLang,
          }}
        >
          <FormStyled>
            <FormTitle>{t("account.changeLang")}</FormTitle>

            <Label>
              <Input as="select" name="lang">
                <option value="en">English</option>
                <option value="uk">Українська</option>
              </Input>

              <FormButton type="submit">{t("buttons.update")}</FormButton>
            </Label>
          </FormStyled>
        </Formik>
      </MainWrap>

      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </>
  );
};

export default AccountPage;
