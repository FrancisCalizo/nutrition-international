import { useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router";

import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PurchaseDetail() {
  const navigate = useNavigate();

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [isApprovalStageModalOpen, setIsApprovalStageModalOpen] =
    useState(false);
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
        <div className="flex gap-2 ">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="sm"
            onClick={() => setIsMilestoneModalOpen(true)}
          >
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

  const handleShowMilestones = () => {
    navigate("/purchase/PR-NGA-01/milestone");
  };

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
            onClick={null}
          >
            Create Contract
          </button>

          {activeTab === "details" ? (
            <button
              className="bg-red-800/20 text-red-800 py-2 px-4 rounded-md border-none cursor-pointer ml-6"
              onClick={() => setIsApprovalStageModalOpen(true)}
            >
              Approval Stage
            </button>
          ) : (
            <button
              className="bg-red-800/20 text-red-800 py-2 px-4 rounded-md border-none cursor-pointer ml-6"
              onClick={handleShowMilestones}
            >
              Show Milestone
            </button>
          )}
        </div>
      </>
    );
  };

  function PreviewMilestoneModal({ isOpen, onClose }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        {/* @ts-ignore */}
        <DialogContent className="bg-white min-w-3xl">
          {/* @ts-ignore */}
          <DialogHeader>
            <div className="mb-4">
              {/* @ts-ignore */}
              <DialogTitle className="text-black">
                Preview Milestone
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Year</th>
                  <th className="text-left p-2">Months</th>
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Convert (CAD)</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">
                      <Select defaultValue={transaction.year.toString()}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Select defaultValue={transaction.month}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2 font-semibold">{transaction.value}</td>
                    <td className="p-2 bg-red-100 text-gray-600 rounded">
                      {transaction.converted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 p-2 bg-gray-100 rounded">
              <span className="font-semibold">Total</span>
              <span className="p-2 bg-green-200 rounded font-semibold">
                $222.00
              </span>
              <span className="p-2 bg-green-200 rounded font-semibold">
                400.00
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  function ApprovalStageModal({ isOpen, onClose }) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        {/* @ts-ignore */}
        <DialogContent className="bg-white min-w-xl">
          {/* @ts-ignore */}
          <DialogHeader>
            <div className="mb-4">
              {/* @ts-ignore */}
              <DialogTitle className="text-black">Approval Stage</DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-4">
            <div className="max-w-md mx-auto p-4">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-2.5 top-0 w-1 h-full bg-gray-200"></div>

                {approvals.map((approval, index) => (
                  <div key={index} className="flex items-center mb-6 relative">
                    {/* Progress Indicator */}
                    <div className="relative z-10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          approval.completed ? "bg-orange-500" : "bg-gray-300"
                        }`}
                      >
                        {approval.completed && (
                          <div className="absolute left-3 w-0.5 h-full bg-orange-500"></div>
                        )}
                      </div>
                    </div>

                    {/* Approval Details */}
                    <div className="ml-4 flex-1">
                      <p className="text-gray-500 text-sm uppercase">
                        {approval.role}
                      </p>
                      <p className="font-semibold text-lg">{approval.name}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-orange-100 text-orange-500 text-sm px-3 py-1 rounded-md">
                      {approval.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
            <Card className="mt-8 mb-6 border-none bg-white">
              <CardContent className="p-6">
                <h2 className="text-lg font-medium text-red-800 mb-6">
                  Amount Status
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Contract</span>
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
                    {Object.entries(contractTableData).map(([key, value]) => (
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

                <div className="font-bold mt-6">Supporting Documents</div>

                <Card className="bg-teal-100 p-6 mb-4 border-none mt-8">
                  <div className="space-y-4 ">
                    <label className="block text-md font-bold mb-2">
                      ContractAgreement with MUC
                    </label>

                    <div className="underline"> Contract.pdf</div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <PreviewMilestoneModal
          isOpen={isMilestoneModalOpen}
          onClose={() => setIsMilestoneModalOpen(false)}
        />

        <ApprovalStageModal
          isOpen={isApprovalStageModalOpen}
          onClose={() => setIsApprovalStageModalOpen(false)}
        />
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

const contractTableData = {
  contractCode: "1234",
  contractType: "General",
  contractTitle: "Catalent - Supply 2034",
  programOfficer: "Leeza Sharma",
  vendor: "Catalent Pharma Solutions",
  currency: "CAD",
  area: "MUL - Multiple Locations",
  signatureDate: "12/12/2024",
  contractValue: "$5,000",
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

const transactions = [
  { year: 2019, month: "May", value: "$1,200.00", converted: "1,680.00" },
  { year: 2021, month: "November", value: "$2,300.00", converted: "3,220.00" },
];

const years = [2019, 2020, 2021, 2022, 2023];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const approvals = [
  {
    role: "PO",
    name: "John F. Samuel",
    status: "Pending Approval",
    completed: true,
  },
  {
    role: "GAD",
    name: "Josiah Messaich",
    status: "Pending Approval",
    completed: false,
  },
  {
    role: "CFO",
    name: "Moses Blake",
    status: "Pending Approval",
    completed: false,
  },
];
