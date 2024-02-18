import * as Yup from 'yup';

export const clientSchema = Yup.object().shape({
  name: Yup.string().required('Mohon isi nama lengkap anda'),
  email: Yup.string()
    .email('Mohon Masukkan Email yang valid')
    .required('Mohon isi email anda'),
  phoneNumber: Yup.string().required('Mohon isi username anda'),
  address: Yup.string().required('Mohon isi password anda'),
  project: Yup.string().required('Mohon pilih role terlebih dahulu'),
});
