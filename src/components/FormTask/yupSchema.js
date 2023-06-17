import * as yup from 'yup';

export let schema = yup.object().shape({
  name: yup.string().required('Please fill the field'),
  qty: yup.number().required('Please fill the field'),
  unit: yup.string(),
  dateOrder: yup.string().required('Please fill the field'),
  supplier: yup.string().required('Please fill the field'),
  dateInvoice: yup.string().required('Please fill the field'),
  datePayment: yup.string().required('Please fill the field'),
  freight: yup.string(),
  dateETD: yup.string().required('Please fill the field'),
  dateETA: yup.string().required('Please fill the field'),
  comments: yup.string().required('Please fill the field'),
});
