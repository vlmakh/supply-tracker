import * as yup from 'yup';

export let schema = yup.object().shape({
  name: yup.string().required(),
  qty: yup.number().required(),
  unit: yup.string(),
  dateOrder: yup.string().required(),
  supplier: yup.string(),
  dateInvoice: yup.string().required(),
  datePayment: yup.string().required(),
  freight: yup.string(),
  dateETD: yup.string().required(),
  dateETA: yup.string().required(),
  comments: yup.string(),
});
