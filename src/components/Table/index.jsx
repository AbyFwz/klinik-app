import React, { useMemo, useState } from "react";
import {
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsChevronRight,
  BsChevronLeft,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";

import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import Pagination from "./Pagination";
import { ButtonMain } from "../Button";
import { Checkbox } from "./Checkbox";

export default function Table({ columns, data }) {
  const [toggleColumn, setToggleColumn] = useState(false);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    allColumns,
    getToggleHideAllColumnsProps,
    setPageSize
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {/* Show/Hide column */}
      {toggleColumn && (
        <div className="absolute right-0 mt-12 mr-14 p-4 bg-slate-50 rounded-md shadow-lg overflow-hidden z-20 duration-100">
          <div className="flex flex-row z-10">
            <Checkbox {...getToggleHideAllColumnsProps()} />
            <span className="ml-2">Select All</span>
          </div>
          {allColumns.map((column) => (
            <div key={column.id}>
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  {...column.getToggleHiddenProps()}
                />
                {column.Header}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Top Area (above table) */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div id="search-bar" className="mt-4 z-1 flex-col duration-300">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <div className="float-right">
            <div className="z-10">
              <ButtonMain
                bgColor="bg-red-300"
                hoverColor="hover:bg-red-400"
                text="Show/Hide"
                onClick={() => setToggleColumn(!toggleColumn)}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-5"></div>

        {/* Table */}
        
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200 z-50"
          >
            <thead className="bg-slate-400">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left font-medium text-white"
                    >
                      {column.render("Header")}
                      <span className="pl-3 inline-block align-middle">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BsChevronDown />
                          ) : (
                            <BsChevronUp />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-slate-50">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`px-6 py-4 whitespace-nowrap ${cell.column.className}`}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-row  w-full justify-between mt-6">
          <div className="text-slate-500 text-sm">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>

          <div className="flex flex-row">
            <Pagination
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              icon={<BsChevronDoubleLeft />}
            />
            <Pagination
              onClick={previousPage}
              disabled={!canPreviousPage}
              icon={<BsChevronLeft />}
            />
            <Pagination
              onClick={nextPage}
              disabled={!canNextPage}
              icon={<BsChevronRight />}
            />
            <Pagination
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              icon={<BsChevronDoubleRight />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
