import { FC, useState, useEffect } from "react";
import { FormStyled, FormTitle, AddTaskFormButton } from "./FormTask.styled";
import { Formik } from "formik";
import { CloseButton } from "components/Base/Buttons.styled";
import { FormCommon } from "./FormCommon";
import { schema } from "./yupSchema";
import { IoClose } from "react-icons/io5";
import { t } from "i18next";
import { useTaskStore } from "utils/store";
import { ITask, IDates } from "components/types";

type Props = {
  toggleEditWindow: () => void;
  task: ITask;
};

export const FormTaskEdit: FC<Props> = ({ toggleEditWindow, task }) => {
  const [dates, setDates] = useState<IDates>({
    dateOrder: new Date(Date.parse(task.dateOrder)),
    dateInvoice: new Date(Date.parse(task.dateInvoice)),
    datePayment: new Date(Date.parse(task.datePayment)),
    dateETD: new Date(Date.parse(task.dateETD)),
    dateETA: new Date(Date.parse(task.dateETA)),
  });

  const { dateOrder, dateInvoice, datePayment, dateETD, dateETA } = dates;

  const { handleUpdateTask } = useTaskStore((state) => state);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  const handleSubmit = (newTask: ITask) => {
    const data = {
      newTask,
      dateOrder: dateOrder.toDateString(),
      dateInvoice: dateInvoice.toDateString(),
      datePayment: datePayment.toDateString(),
      dateETD: dateETD.toDateString(),
      dateETA: dateETA.toDateString(),
    };

    task._id && handleUpdateTask(task._id, data);

    toggleEditWindow();
  };

  const handleEscape = (event: { code: string; }) => {
    if (event.code === "Escape") {
      toggleEditWindow();
    }
  };

  const initialValues: ITask = {
        _id: task._id,
        name: task.name,
        qty: task.qty,
        unit: task.unit,
        dateOrder: dateOrder.toDateString(),
        supplier: task.supplier,
        dateInvoice: dateInvoice.toDateString(),
        datePayment: datePayment.toDateString(),
        freight: task.freight,
        completed: task.completed,
        dateETD: dateETD.toDateString(),
        dateETA: dateETA.toDateString(),
        comments: task.comments,}

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      <FormStyled>
        <CloseButton type="button" onClick={toggleEditWindow}>
          <IoClose size="20" />
        </CloseButton>

        <FormTitle>{t("formTask.edit")}</FormTitle>

        <FormCommon dates={dates} setDates={setDates} />

        <AddTaskFormButton type="submit">{t("buttons.save")}</AddTaskFormButton>
      </FormStyled>
    </Formik>
  );
};
