import React from "react";
import { useTable, useSortBy } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const SurveyTable = ({ datas }) => {
  const columns = [
    {
      Header: "Title",
      accessor: "text",
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        datas,
      },
      useSortBy
    );

  console.log("datas", datas);

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   tableInstance;

  return (
    <Table {...getTableProps()} variant="striped" colorScheme="teal">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default SurveyTable;
