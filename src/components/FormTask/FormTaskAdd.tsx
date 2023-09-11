import { FC, useState, useEffect } from "react";
import { FormStyled, FormTitle, AddTaskFormButton } from "./FormTask.styled";
import { Formik } from "formik";
import { CloseButton } from "components/Base/Buttons.styled";
import { schema } from "./yupSchema";
import { FormCommon } from "./FormCommon";
import { IoClose } from "react-icons/io5";
import { t } from "i18next";
import { ITask, IDates } from "components/types";

type Props = {
  toggleModal: () => void;
  handleAddTask: (x: Partial<ITask>) => void;
};

export const FormTaskAdd: FC<Props> = ({ toggleModal, handleAddTask }) => {
  const today = new Date();

  const [dates, setDates] = useState<IDates>({
    dateOrder: today,
    dateInvoice: new Date(today.getTime() + 86_400_000),
    datePayment: new Date(today.getTime() + 2 * 86_400_000),
    dateETD: new Date(today.getTime() + 3 * 86_400_000),
    dateETA: new Date(today.getTime() + 4 * 86_400_000),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  const handleSubmit = (newTask: Partial<ITask>) => {
    handleAddTask({
      ...newTask,
      dateOrder: dateOrder.toString(),
      dateInvoice: dateInvoice.toString(),
      datePayment: datePayment.toString(),
      dateETD: dateETD.toString(),
      dateETA: dateETA.toString(),
    });

    toggleModal();
  };

  const handleEscape = (event: { code: string }) => {
    if (event.code === "Escape") {
      toggleModal();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        qty: 1,
        unit: `${t("formTask.pcs")}`,
        dateOrder: dateOrder.toString(),
        supplier: "-",
        dateInvoice: dateInvoice.toString(),
        datePayment: datePayment.toString(),
        freight: `${t("formTask.nova")}`,
        dateETD: dateETD.toString(),
        dateETA: dateETA.toString(),
        comments: "-",
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleModal}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t("formTask.add")}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t("buttons.add")}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};
