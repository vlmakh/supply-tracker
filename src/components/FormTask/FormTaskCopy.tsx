import { FC, useState, useEffect } from "react";
import { FormStyled, FormTitle, AddTaskFormButton } from "./FormTask.styled";
import { Formik } from "formik";
import { CloseButton } from "components/Base/Buttons.styled";
import { schema } from "./yupSchema";
import { FormCommon } from "./FormCommon";
import { IoClose } from "react-icons/io5";
import { t } from "i18next";
import { useTaskStore } from "utils/store";
import { ITask, IDates } from "components/types";

type Props = {
  toggleCopyWindow: () => void;
  task: ITask;
};

export const FormTaskCopy: FC<Props> = ({ toggleCopyWindow, task }) => {
  const today = new Date();

  const [dates, setDates] = useState<IDates>({
    dateOrder: today,
    dateInvoice: new Date(today.getTime() + 86_400_000),
    datePayment: new Date(today.getTime() + 2 * 86_400_000),
    dateETD: new Date(today.getTime() + 3 * 86_400_000),
    dateETA: new Date(today.getTime() + 4 * 86_400_000),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { addNewTask } = useTaskStore((state) => state);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  const handleSubmit = (newTask: Partial<ITask>) => {
    addNewTask({
      ...newTask,
      dateOrder: dateOrder.toDateString(),
      dateInvoice: dateInvoice.toDateString(),
      datePayment: datePayment.toDateString(),
      dateETD: dateETD.toDateString(),
      dateETA: dateETA.toDateString(),
    });

    toggleCopyWindow();
  };

  const handleEscape = (event: { code: string; }) => {
    if (event.code === "Escape") {
      toggleCopyWindow();
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{  
        name: task.name,
        qty: task.qty,
        unit: task.unit,
        dateOrder: dateOrder.toDateString(),
        supplier: task.supplier,
        dateInvoice: dateInvoice.toDateString(),
        datePayment: datePayment.toDateString(),
        freight: task.freight,
        completed: false,
        dateETD: dateETD.toDateString(),
        dateETA: dateETA.toDateString(),
        comments: task.comments,
      }}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleCopyWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t("formTask.add")}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t("buttons.add")}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};
