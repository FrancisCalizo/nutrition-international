import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function ContractDetail() {
  const navigate = useNavigate();

  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

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
      header: "Amount (USD)",
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.accessor("convert", {
      header: "Convert (CAD)",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("financialCoding", {
      header: "Financial Coding",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("completed", {
      header: "Completed",
      cell: (info) => info.getValue().toString(),
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
    columnHelper.accessor("supportingDocs", {
      header: "Supporting Documents",
      cell: (info) => (
        <div className="flex gap-2 ">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => setIsDocsModalOpen(true)}
          >
            <Eye className="w-4 h-4" />
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

  return (
    <div>
      <Header>
        <>
          <div className="flex">
            <button
              onClick={() => navigate(`/contract/`)}
              className="cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <div className="ml-4">
              <h2 className="text-xl font-semibold ">Milestones</h2>
              <div>View the current milestone for this contract</div>
            </div>
          </div>
        </>
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

      <SupportingDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />
    </div>
  );
}

function SupportingDocsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* @ts-ignore */}
      <DialogContent className="bg-white p-8 max-w-2xl">
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="mb-4">
            {/* @ts-ignore */}
            <DialogTitle className="text-red-800">
              Payment 01 (Supporting Documents)
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi,
          commodi aliquam. Quis id suscipit atque ratione iste illum nisi quas
          accusantium qui harum, dignissimos numquam voluptatum nostrum eveniet
          assumenda laudantium. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Excepturi, commodi aliquam. Quis id suscipit atque
          ratione iste illum nisi quas accusantium qui harum, dignissimos
          numquam voluptatum nostrum eveniet assumenda laudantium.
        </div>
      </DialogContent>
    </Dialog>
  );
}

const data = [
  {
    milestoneType: "Technical Report",
    date: "2/04/24",
    amount: "$500",
    convert: "$700",
    financialCoding: "0143-GAC-ISG 2019",
    completed: true,
    completedDate: "2/04/2024",
    completedBy: "Damien Broomes",
    notes: "SME for design and planning: including SME for implementation",
  },
  {
    milestoneType: "Site Inspection",
    date: "2/10/24",
    amount: "$750",
    convert: "$900",
    financialCoding: "0245-GAC-ISG 2020",
    completed: true,
    completedDate: "2/11/2024",
    completedBy: "Jasmine Lee",
    notes: "Verified structural integrity and compliance with codes.",
  },
  {
    milestoneType: "Budget Review",
    date: "3/01/24",
    amount: "$1,200",
    convert: "$1,500",
    financialCoding: "0356-GAC-FIN 2021",
    completed: false,
    completedDate: null,
    completedBy: "John Stamos",
    notes: "Pending approval from the finance committee.",
  },
  {
    milestoneType: "Stakeholder Meeting",
    date: "3/15/24",
    amount: "$600",
    convert: "$800",
    financialCoding: "0457-GAC-OPS 2022",
    completed: true,
    completedDate: "3/15/2024",
    completedBy: "Nathan Chen",
    notes: "Discussed project scope, risks, and deliverables.",
  },
  {
    milestoneType: "Prototype Testing",
    date: "4/02/24",
    amount: "$950",
    convert: "$1,200",
    financialCoding: "0568-GAC-RND 2023",
    completed: false,
    completedDate: null,
    completedBy: "Ricky Bobby",
    notes: "First round of testing completed, awaiting feedback.",
  },
];
