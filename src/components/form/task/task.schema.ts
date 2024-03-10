import * as yup from 'yup';

export const TaskFormSchema = yup.object().shape({
  name: yup.string().required('Nama task tidak boleh kosong'),
  // projectId: yup.string().required('Project harus dipilih'),
  milestoneId: yup.string().required('Milestone harus dipilih'),
  member: yup.array().min(1, 'Member harus dipilih').required(''),
  priority: yup.string().required('Tingkat prioritas harus dipilih'),
  endDate: yup.date().required('Mohon Pilih Tanggal'),
  status: yup.string().required('Tolong pilih status'),
});
