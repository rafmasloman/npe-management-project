import * as yup from 'yup';

export const MemberSchema = yup.object().shape({
  position: yup.string().required('Mohon masukkan posisi'),
  phoneNumber: yup.number().required('Mohon masukkan nomor telefon'),
  gender: yup.string().required('Mohon pilih jenis kelamin'),
  birthDate: yup.string().required('Mohon pilih tanggal lahir'),
  userId: yup
    .string()
    .required('Mohon pilih user yang akan menjadi member terlebih dulu'),
});
