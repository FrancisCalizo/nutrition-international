import { useNavigate } from "react-router";

import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function Contract() {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("contractCode", {
      header: "Contract Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("contractTitle", {
      header: "Contract Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("preqNumber", {
      header: "P Req Number",
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.accessor("project", {
      header: "Project",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("contractType", {
      header: "Contract Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("milestone", {
      header: "Milestone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <div className="flex gap-2">
          <Button className="bg-teal-500 text-white" size="sm">
            {info.getValue()}
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (r) => {
    const { contractCode } = r;

    navigate(`/contract/${contractCode}`);
  };

  return (
    <div>
      <Header>
        <div>
          <h1 className="text-2xl font-semibold">Contracts</h1>
        </div>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search for project.."
            className="bg-white w-60 border-none"
          />

          <button
            className="bg-red-800 text-white py-2 px-4 rounded-md border-none cursor-pointer"
            // onClick={handleCreatePr}
          >
            <SlidersHorizontal />
          </button>
        </div>
      </Header>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-red-800 text-white">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-r border-gray-200"
                    // @ts-ignore
                    onClick={() => handleRowClick(row.original)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const data = [
  {
    contractCode: 3432,
    contractTitle: "Catalent Supply - 2024",
    preqNumber: "1267-",
    project: "2034 - VAS Supply Chain",
    contractType: "General",
    category: "Shared Indirect",
    milestone: "25%",
    status: "Approved",
  },
  {
    contractCode: 9062,
    contractTitle: "Catalent Supply",
    preqNumber: "1267-",
    project: "2034 - MUL Multiple Healthcare",
    contractType: "General",
    category: "Shared Indirect",
    milestone: "25%",
    status: "Approved",
  },
];
