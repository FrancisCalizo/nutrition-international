import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Milestones = () => {
  const data = [
    {
      fundingSource: "0143 - GAC - ISG 2019",
      financialCoding: "4776-4568-0000-0143-5467",
      total: 3500,
    },
    {
      fundingSource: "0409 - GAC - 13M COVID Emergency",
      financialCoding: "4776-4568-0000-0143-5467",
      total: 1000,
    },
    {
      fundingSource: "6501 - JPG - Vit A Malawi",
      financialCoding: "4776-4568-0000-0143-5467",
      total: 2000,
    },
  ];

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("fundingSource", {
      header: "Funding Source",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("financialCoding", {
      header: "Financial Coding",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("total", {
      header: "Total (CAD)",
      cell: (info) => `$${info.getValue().toLocaleString()}`,
    }),
    columnHelper.display({
      id: "milestones",
      header: "Milestones",
      cell: () => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-red-700 hover:text-red-800 hover:bg-red-50"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
          <Button variant="ghost" size="sm">
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

  const total = data.reduce((sum, row) => sum + row.total, 0);

  return (
    <div>
      <Card className="mb-8 border-none bg-white">
        <CardHeader>
          <CardTitle className="text-red-700 text-lg">
            Purchase Requisition Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Value
            </label>

            <Input
              value="$6,500.00"
              className=" bg-white border-gray-300 "
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white">
        <CardHeader>
          <CardTitle className="text-red-700 text-lg">
            Define Milestone
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-r border-gray-200"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="font-medium">
                  <td className="px-4 py-3">Total</td>
                  <td></td>
                  <td className="px-4 py-3">${total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Milestones;
