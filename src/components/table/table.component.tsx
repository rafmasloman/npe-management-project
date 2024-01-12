import { Table as TableMantine, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ITableProps {
  tableHead: Array<{ title: string }>;
  tableRow?: Array<any>;
}

const Table = ({ tableHead, tableRow }: ITableProps) => {
  const { data: tes } = useQuery({
    queryKey: [''],
  });

  const ths = (
    <tr>
      {tableHead.map((th, index) => {
        return (
          <th key={index} className="px-6 py-2.5 ">
            <Text className="text-white" fw={600}>
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
    <table className="table-auto border-collapse  w-full py-2 rounded-t-lg">
      <thead className=" bg-primary ">{ths}</thead>
      <tbody className="bg-white">{tableRow}</tbody>
    </table>
  );
};

export default Table;
