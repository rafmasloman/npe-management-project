import * as yup from 'yup';

export const PayrollSchema = yup.object().shape({
  projectId: yup.string().required('Mohon pilih Project'),
  memberId: yup.string().required('Mohon pilih member yang akan digaji'),
  percent: yup.number().required('Mohon isi persentase gaji'),
  transactionProvider: yup
    .string()
    .required('Mohon pilih provider yang akan digunakan'),
});
