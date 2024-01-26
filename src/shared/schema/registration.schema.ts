import * as Yup from 'yup';

export const registrationDataSchema = Yup.object().shape({
  email: Yup.string().email().required('Masukkan Email'),
  password: Yup.string()
    .max(20, 'Panjang password maksimal 20')
    .required('Masukkan Password'),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref('password'), undefined],
      'Konfirmasi password harus sama dengan password',
    )
    .required('Masukkan Konfirmasi Password'),
  username: Yup.string().required('Masukkan Nama Pengguna (Username)'),
  firstname: Yup.string().required('Masukkan Nama Depan'),
  lastname: Yup.string().required('Masukkan Nama Belakang'),
});
