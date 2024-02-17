import TruncateText from "@/utils/TruncateTeaxt";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
function Table({ columns, data, ThClassName, TrClassName, TdClassName }) {
  const [FilterText, setFilterText] = useState("initialState");
  // const ColumnDate = createColumnHelper();
  const Table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: FilterText,
    },
    onGlobalFilterChange: setFilterText,
  });

  return (
    <>
      <header className="mb-5">
        <input
          type="text"
          placeholder="Buscar"
          value={FilterText}
          className="bg-black/30 rounded-lg py-1.5 px-2 text-white focus:outline-none placeholder:text-white"
          onChange={(e) => setFilterText(e.target.value)}
        />
      </header>
      <table className="md:w-full dark:bg-DarkComponent   rounded-2xl text-white">
        <thead>
          {Table.getHeaderGroups()?.map((HeaderGroup) => (
            <tr key={HeaderGroup.id}>
              {HeaderGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={clsx(
                    "py-2.5 px-3 text-base font-bold",
                    ThClassName
                  )}
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
          <tbody>
            {Table.getRowModel()?.rows.map((row, index) => (
              <tr
                key={index}
                className=" border-t border-gray-200 dark:border-gray-100/10 dark:text-white text-black "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      "py-2 px-1 text-sm text-center  border-b dark:border-gray-100/10"
                    }
                  >
                    {cell.column.columnDef.cell && (
                      <TruncateText
                        text={flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                        ComponentNext={() => <></>}
                        maxLength={5}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
      <footer className="flex justify-end mt-5">
        <button
          onClick={() => Table.previousPage()}
          disabled={!Table.getCanPreviousPage()}
          className="bg-black px-3 py-1.5  rounded-lg mx-1 text-white text-sm"
        >
          Retroceder
        </button>
        <button
          onClick={() => Table.nextPage()}
          disabled={!Table.getCanNextPage()}
          className="bg-black px-3 py-1.5  rounded-lg mx-1 text-white text-sm"
        >
          Siguiente
        </button>
      </footer>
    </>
  );
}

export default Table;
Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  ThClassName: PropTypes.string,
  TrClassName: PropTypes.string,
  TdClassName: PropTypes.string,
};
