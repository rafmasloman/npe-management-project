import * as yup from 'yup';

export const TaskFormSchema = yup.object().shape({
  name: yup.string().required('Nama task tidak boleh kosong'),
  projectId: yup.string().required('Project harus dipilih'),
  milestoneId: yup.string().required('Milestone harus dipilih'),
  member: yup.array(),
  priority: yup.string().required('Tingkat prioritas harus dipilih'),
  endDate: yup.string().required('Silahkan Pilih tanggal terlebih dulu'),
  status: yup.string().required('Tolong pilih status'),
});
