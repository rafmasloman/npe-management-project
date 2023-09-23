import { Table as TableMantine } from '@mantine/core';
import { ReactNode } from 'react';

interface ITableProps {
  tableHead: ReactNode;
  tableRow: ReactNode;
}

const Table = ({ tableHead, tableRow }: ITableProps) => {
  return (
    <TableMantine>
      <thead>{tableHead}</thead>
      <tbody>{tableRow}</tbody>
    </TableMantine>
  );
};

export default Table;
