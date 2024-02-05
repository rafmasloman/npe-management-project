import { Table as TableMantine, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ITableProps {
  tableHead: Array<{ title: string }>;
  tableRow?: Array<any>;
}

const Table = ({ tableHead, tableRow }: ITableProps) => {
  const ths = (
    <tr className="">
      {tableHead.map((th, index) => {
        return (
          <th
            key={index}
            className={` ${index === 0 ? 'rounded-tl-lg' : ''} ${
              index === tableHead.length - 1 ? 'rounded-tr-lg' : ''
            }`}
            // colSpan={th.title === 'Project' ? 1 : 0}
          >
            <Text
              className="text-slate-700 font-medium text-sm text-center "
              fw={600}
            >
              {th.title}
            </Text>
          </th>
        );
      })}
    </tr>
  );

  // const trs = tableRow?.map((tr, index) => {
  //   return <tr key={index}>{tr}</tr>;
  // });

  return (
    <TableMantine
      align="right"
      className="table-auto border-collapse  w-full py-2 rounded-t-lg"
      verticalSpacing={'lg'}
      horizontalSpacing={'md'}
    >
      <thead className="bg-blue-200 ">{ths}</thead>
      <tbody className="bg-white">{tableRow}</tbody>
    </TableMantine>
  );
};

export default Table;
