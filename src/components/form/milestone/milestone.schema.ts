import * as yup from 'yup';

export const schema = yup.object().shape({
  projectName: yup.string().required('Nama Project tidak boleh kosong'),
  projectId: yup.string().required('Mohon Pilih Project'),
  startedDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  endDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
});
