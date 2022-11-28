import React from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

import makeData from "./makeData.json";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .btn-add {
    margin-bottom: 1rem;
    padding: 0.5rem 2.3rem;
  }

  .btn-submit {
    margin-top: 1rem;
    padding: 0.5rem 3.7rem;
  }
`;

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 30);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function App() {
  const [data, setData] = React.useState(React.useMemo(() => makeData, []));
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Country",
            accessor: "country",
            Cell: (props) => (
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={(e) => (props.row.original.country = e.target.value)}
                defaultValue={props.row.original.country}
              />
            )
          }
        ]
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: "delete",
        Cell: (props) => (
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline"
            }}
            onClick={() => {
              const dataCopy = [...data];
              dataCopy.splice(props.row.index, 1);
              setData(dataCopy);
            }}
          >
            Delete
          </span>
        )
      }
    ],
    [data]
  );

  const handleAddRow = () => {
    setData(data.concat({ country: "" }));
  };

  const handleSubmit = () => {
    console.log("Submit ", data);
  };

  return (
    <Styles>
      <div className="block-buttons">
        <button onClick={() => handleAddRow()} className="btn-add">
          Add New Row
        </button>
      </div>
      <Table columns={columns} data={data} />
      <div className="block-buttons">
        <button onClick={() => handleSubmit()} className="btn-submit">
          Submit
        </button>
      </div>
    </Styles>
  );
}

export default App;
