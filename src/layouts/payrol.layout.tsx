import { Space } from '@mantine/core';
import ModalForm from '../components/modal/modal-form.component';
import PayrollForm from '../components/form/payroll.form.component';
import Table from '../components/table/table.component';

const PayrollSpace = () => {
  const tableHead = () => {
    return (
      <tr>
        <th>Nama</th>
        <th>Position</th>
        <th>Gaji</th>
        <th>Payment Account</th>
      </tr>
    );
  };

  const tableRow = () => {
    return <tr></tr>;
  };

  return (
    <>
      <ModalForm btnText="Tambah Payment" title="Create Payment for Member">
        <PayrollForm />
      </ModalForm>

      <Space h={'lg'} />

      <Table tableHead={tableHead()} tableRow={tableRow()} />
    </>
  );
};

export default PayrollSpace;
