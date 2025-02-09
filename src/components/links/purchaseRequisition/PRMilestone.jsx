import { useNavigate } from "react-router";
import { ArrowLeft, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Header from "@/components/layout/Header";

export default function PRMilestone() {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("milestoneType", {
      header: "Milestone Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `$${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor("financialCoding", {
      header: "Financial Coding",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("completed", {
      header: "Completed",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("completedDate", {
      header: "Completed Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("completedBy", {
      header: "Completed By",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("notes", {
      header: "Notes",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "supportingDocuments",
      header: "Supporting Documents",
      cell: () => (
        <div className="flex gap-2 ">
          <Button className="cursor-pointer" variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const MilestoneHeader = () => {
    const navigate = useNavigate();

    return (
      <>
        <div className="flex">
          <button
            onClick={() => navigate(`/purchase/PR-NGA-01`)}
            className="cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Milestones</h2>
            <div className="text-sm">
              View the current milestone for this contract
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Header>
        <MilestoneHeader />
      </Header>

      <div>
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
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-r border-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Card className="mt-12 border-none bg-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-red-800" />
              <h2 className="text-lg font-medium text-red-800">Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subtotal Paid */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Subtotal Paid
                </label>
                <Input
                  type="text"
                  value="$ 500.00"
                  readOnly
                  className="bg-gray-50 text-lg font-medium text-gray-900"
                />
              </div>

              {/* Subtotal Unpaid */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Subtotal Unpaid
                </label>
                <Input
                  type="text"
                  value="$ 1,100.00"
                  readOnly
                  className="bg-gray-50 text-lg font-medium text-gray-900"
                />
              </div>

              {/* Total */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  Total
                </label>
                <Input
                  type="text"
                  value="$ 1,600.00"
                  readOnly
                  className="bg-gray-50 text-lg font-medium text-gray-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const tableData = [
  {
    milestoneType: "Technical Report",
    date: "12/12/2024",
    amount: 3500,
    financialCoding: "0232 - FAC - ISG 2023",
    completed: true,
    completedDate: "02/04/2032",
    completedBy: "Damien Broomes",
    notes: "SME for design and planning",
  },
  {
    milestoneType: "Technical Report",
    date: "12/12/2024",
    amount: 3500,
    financialCoding: "0232 - FAC - ISG 2023",
    completed: true,
    completedDate: "02/04/2032",
    completedBy: "Damien Broomes",
    notes: "SME for design and planning",
  },
  {
    milestoneType: "Technical Report",
    date: "12/12/2024",
    amount: 3500,
    financialCoding: "0232 - FAC - ISG 2023",
    completed: true,
    completedDate: "02/04/2032",
    completedBy: "Damien Broomes",
    notes: "SME for design and planning",
  },
  {
    milestoneType: "Technical Report",
    date: "12/12/2024",
    amount: 3500,
    financialCoding: "0232 - FAC - ISG 2023",
    completed: true,
    completedDate: "02/04/2032",
    completedBy: "Damien Broomes",
    notes: "SME for design and planning",
  },
];
