import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";

import Header from "../layout/Header";

export default function Purchase() {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/procurement/${id}`);
  };

  const columns = [
    columnHelper.accessor("pReqCode", {
      header: "P-Req Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("projectCode", {
      header: "Project Code/Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("requester", {
      header: "Requester",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("procurementType", {
      header: "Procurement Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const PurchaseHeader = () => {
    return (
      <>
        <h1 className="text-2xl font-semibold">Purchase Requisitions</h1>
        <div className="flex items-center gap-4">
          <button
            className="bg-red-800 text-white py-2 px-4 rounded-md border-none cursor-pointer"
            onClick={handleCreatePr}
          >
            Create Purchase Requisition
          </button>
        </div>
      </>
    );
  };

  const handleCreatePr = () => {
    navigate(`/createpurchaserequisition`);
  };

  return (
    <>
      <Header>{PurchaseHeader()}</Header>

      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-red-800 text-white">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-sm"
                  style={{
                    minWidth: header.id === "projectCode" ? "200px" : "150px",
                  }}
                >
                  {header.column.getCanSort() ? (
                    <div
                      className="flex items-center gap-2 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp className="h-4 w-4" />,
                        desc: <ChevronDown className="h-4 w-4" />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              // @ts-ignore
              onClick={() => handleRowClick(row.original.pReqCode)}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// Sample data
const data = [
  {
    pReqCode: "PR-NGA-01",
    projectCode: "2034 - VAS Supply",
    requester: "Mohammed Sliqi",
    procurementType: "Procured Services (Services...",
    category: "Shared Indirect",
    amount: "$2,500",
    status: "Approved",
  },
  {
    pReqCode: "PR-NGA-05",
    projectCode: "5309 - Health Support",
    requester: "David Sharma",
    procurementType: "Procured Services (Services...",
    category: "Shared Indirect Country",
    amount: "$400",
    status: "Approved",
  },
  {
    pReqCode: "PR-MUL-2567",
    projectCode: "1426 - Clean Energy",
    requester: "Leeza Toredo",
    procurementType: "Procured Services (Services...",
    category: "Indirect",
    amount: "$300",
    status: "Approved",
  },
  {
    pReqCode: "WES-9801",
    projectCode: "5678 - Child Survival",
    requester: "Mayowa Oladunjoye",
    procurementType: "Procured Services (Services...",
    category: "Direct",
    amount: "$10,000",
    status: "Approved",
  },
  {
    pReqCode: "WES-9805",
    projectCode: "9416 - VAS Supply Year 2023",
    requester: "David Ajala",
    procurementType: "Procured Services (Services...",
    category: "Shared Indirect Region",
    amount: "$2,450",
    status: "Approved",
  },
];

const columnHelper = createColumnHelper();
