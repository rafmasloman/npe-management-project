import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Mohon Masukkan Email yang valid')
    .required('Mohon isi email anda'),
  username: Yup.string().required('Mohon masukkan username'),
  password: Yup.string().required('Mohon masukkan password'),
  firstname: Yup.string().required('Mohon masukkan Nama  Depan'),
  lastname: Yup.string().required('Mohon masukkan nama Belakang'),
  role: Yup.string().required('Mohon Pilih Role'),
});
