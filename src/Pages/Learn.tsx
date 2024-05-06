import { useMemo } from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const abbottLink = 'https://abbottecho.my.salesforce.com/'

const Example = (data: any) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'Name', 
        header: 'CN Name',
        Cell: ({ row }: {row: any}) => {
          return (
            <a href={abbottLink + row.original.Id} target='_blank'>{row.original.Name}</a>
          )
        } ,
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data,
  });

  return <MantineReactTable table={table} />;
};

export default Example;