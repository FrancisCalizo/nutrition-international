import { useState } from "react";
import { ArrowLeft, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router";

import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function PurchaseDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const formatPropertyName = (name) => {
    return name
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel-cased words
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

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
          <Button variant="ghost" size="sm">
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

  const PurchaseDetailHeader = () => {
    const navigate = useNavigate();

    return (
      <>
        <div className="flex">
          <button
            onClick={() => navigate(`/purchase/`)}
            className="cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <div className="ml-4">
            <h2 className="text-md font-semibold text-gray-400">
              P-REQ Number: <span className="text-red-800 font-bold">2034</span>
            </h2>
            <div>VAS Supply Program 2019-2023</div>
          </div>
        </div>

        <div className="flexitems-center gap-4">
          <button
            className="bg-red-800 text-white py-2 px-4 rounded-md border-none cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Create Contract
          </button>

          <button
            className="bg-red-800/20 text-red-800 py-2 px-4 rounded-md border-none cursor-pointer ml-6"
            onClick={() => setIsModalOpen(true)}
          >
            Approval Stage
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Header>{PurchaseDetailHeader()}</Header>

      <div className="w-full  mx-auto p-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger
              value="details"
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === "details"
                  ? "text-black border-b-2 border-red-800"
                  : "text-gray-400"
              } rounded-none shadow-white`}
              onClick={() => setActiveTab("details")}
            >
              Purchase Requisition Details
            </TabsTrigger>
            <TabsTrigger
              value="contract"
              className={`px-6 py-2 text-sm font-medium ${
                activeTab === "contract"
                  ? "text-black border-b-2 border-red-800"
                  : "text-gray-400"
              } rounded-none shadow-white`}
              onClick={() => setActiveTab("contract")}
            >
              Contract
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-6">
            <Card className="mb-6 border-none bg-white">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium text-red-800 mb-6">
                  Amount Status
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">P-REQ Total</span>
                      <span className="text-emerald-500">$5,000</span>
                    </div>
                    <div className="w-full bg-emerald-500 h-4 rounded"></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Actual</span>
                      <span className="text-red-700">$3,800</span>
                    </div>
                    <div className="w-[76%] bg-red-700 h-4 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 border-none bg-white">
              <CardContent className="p-6">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <tbody>
                    {Object.entries(requisitionData).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-2 border border-gray-200">
                          {formatPropertyName(key)}
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="mb-6 border-none bg-white">
              <CardContent className="p-6">
                <div className="text-red-800 font-bold mb-6">
                  Cost Estimation and Specification
                </div>
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <tbody>
                    {Object.entries(transactionDetailsOne).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="px-4 py-2 border border-gray-200">
                            {formatPropertyName(key)}
                          </td>
                          <td className="px-4 py-2 border border-gray-200">
                            {value.toString()}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <table className="table-auto w-full border-collapse border border-gray-200 mt-6">
                  <tbody>
                    {Object.entries(transactionDetailsTwo).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="px-4 py-2 border border-gray-200">
                            {formatPropertyName(key)}
                          </td>
                          <td className="px-4 py-2 border border-gray-200">
                            {value.toString()}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                <Card className="bg-teal-100 p-6 mb-4 border-none flex justify-end mt-14">
                  <div className="space-y-4 ">
                    <label className="block text-sm font-medium mb-2">
                      Contract Total (CAD)
                    </label>
                    <Input
                      value="$6,500.00"
                      className="max-w-[200px] bg-white border-none"
                      readOnly
                    />
                  </div>
                </Card>

                <div className="font-bold mt-6">Supporting Documents</div>

                <Card className="bg-teal-100 p-6 mb-4 border-none mt-8">
                  <div className="space-y-4 ">
                    <label className="block text-md font-bold mb-2">
                      Terms of Reference Doc
                    </label>

                    <div className="underline"> Terms of reference.pdf</div>
                  </div>
                </Card>

                <Card className="bg-teal-100 p-6 mb-4 border-none mt-8">
                  <div className="space-y-4 ">
                    <label className="block text-md font-bold mb-2">
                      Others
                    </label>

                    <div className="underline"> others.pdf</div>
                  </div>
                </Card>
              </CardContent>
            </Card>

            <Card className="mb-6 border-none bg-white">
              <CardContent className="p-6">
                <div className="text-red-800 font-bold mb-6">
                  Coding and Fiscal Year Payment Distribution
                </div>

                <div className="overflow-x-auto ">
                  <table className="w-full">
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                          key={headerGroup.id}
                          className="bg-red-800 text-white"
                        >
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
                        {/* <td className="px-4 py-3">${total.toLocaleString()}</td> */}
                        <td className="px-4 py-3">$1,200</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contract">
            <Card className="mt-6">
              <CardContent className="p-6"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

const requisitionData = {
  category: "Indirect Services",
  reqNumber: "2034",
  requester: "Mayowa Oladunjoye",
  procurementType: "Procured Services (Services, Events, Meetings)",
  completionDate: "12/12/24",
  notes:
    "Lorem ipsum dolor sit amet consectetur. Enim pulvinar sed feugiat dignissim. Ut dis fringilla velit diam. Tempus in tortor nec augue a vitae. Amet lacus ultrices mi congue pharetra bibendum bibendum. Elementum in magna volutpat suspendisse augue libero et adipiscing. Ac lorem at nunc cursus felis. Ut donec commodo id quis. Enim in magna pharetra id laoreet tellus id tincidunt. Et aliquet accumsan euismod nulla amet metus tortor. Vestibulum quam ac quisque ipsum tellus nulla lacus duis tellus ante. Nunc quisque eu tempor sollicitudin.",
};

const transactionDetailsOne = {
  description:
    "A breakdown of the expected charges for a transaction, including service fees and any additional expenses, providing transparency before payment.",
  currency: "USD Dollar",
  unit: 1,
  unitCost: 400.0,
  exchangeRate: 1.4,
  amount: "$400.00",
  convertedAmount: "$560 (CAD)",
  financialCoding: "4776-4568-0000-0143-5467",
};

const transactionDetailsTwo = {
  description:
    "An itemized summary of anticipated transaction costs, helping parties understand the financial requirements and terms involved.",
  currency: "USD Dollar",
  unit: 2,
  unitCost: 320.0,
  exchangeRate: 1.4,
  amount: "$640.00",
  convertedAmount: "$896 (CAD)",
};

const tableData = [
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
