import { Space } from '@mantine/core';
import ModalForm from '../components/modal/modal-form.component';
import PayrollForm from '../components/form/PayrollForm';
import Table from '../components/table/table.component';
import {
  payroll,
  payroll as payrolls,
} from '@/pages/api/dummy/payroll.dummy.api';
import { salaryPercent } from '../utils/payroll.util';

interface IPayrollProps {
  projectPrice: number;
}

const PayrollSpace = ({ projectPrice }: IPayrollProps) => {
  const tableHead = () => {
    return (
      <tr>
        <th>Nama</th>
        {/* <th>Position</th> */}
        <th>Gaji</th>
        <th>Payment Account</th>
      </tr>
    );
  };

  const tableRow = () => {
    return payrolls.map((payroll) => (
      <tr key={payroll.memberName}>
        <td>{payroll.memberName}</td>
        <td>{salaryPercent(projectPrice, payroll.salary)}</td>
        <td>{payroll.transfer}</td>
      </tr>
    ));
  };

  return (
    <>
      <ModalForm btnText="Tambah Payment" title="Create Payment for Member">
        <PayrollForm />
      </ModalForm>

      <Space h={'lg'} />

      {/* <Table tableHead={tableHead()} tableRow={tableRow()} /> */}
    </>
  );
};

export default PayrollSpace;
