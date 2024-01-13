import * as yup from 'yup';

export const schema = yup.object().shape({
  projectName: yup.string().required('Nama Project tidak boleh kosong'),
  client: yup.string().required('Mohon Pilih Client'),
  platform: yup.string().required('Mohon Pilih Tag'),
  startedDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  endDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  description: yup.string().required('Mohon masukkan deskripsi'),
  price: yup.number().required('Harga Project harus diisi'),
  image: yup
    .mixed()

    .required('Mohon pilih file gambar'),
  projectIcon: yup
    .mixed()

    .required('Mohon pilih icon'),
});
