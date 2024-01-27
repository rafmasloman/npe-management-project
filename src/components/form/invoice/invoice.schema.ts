import * as Yup from 'yup';

export const invoiceFormSchema = Yup.object().shape({
  invoicesTitle: Yup.string().required('Mohon isi judul invoice  anda'),
  clientId: Yup.string().required('Mohon isi client id anda'),
  otherInfo: Yup.string().optional(),
});
