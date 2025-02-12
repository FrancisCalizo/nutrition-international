import { useState } from "react";
import { useNavigate } from "react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  ListTodo,
  RefreshCcw,
  PauseCircle,
  Plus,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && currentStep < steps.length) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(1);
    }
  };

  return (
    <div className="mx-auto p-6 space-y-6 mt-[-60px]">
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          Step {currentStep < steps.length ? currentStep + 1 : 3} of{" "}
          {steps.length}: Create Purchase Requisition
        </h1>
        <p className="text-gray-500 text-sm">
          This form autosaves when you continue
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col pb-6  w-1/3 ${
              index === currentStep ? "text-red-800 " : "text-gray-400"
            } ${
              currentStep >= index
                ? "border-b-3 border-red-800"
                : "border-b-3 border-garay-400"
            }`}
          >
            <div
              className={`p-3 rounded-full w-fit mb-2 ${
                index === currentStep ? "bg-red-800/10" : "bg-gray-100"
              }`}
            >
              {step.icon}
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      <Card className="border-none shadow-none">
        {currentStep === 0 && <PReqDetails projectFunds={projectFunds} />}
        {currentStep === 1 && <CostEstimation />}
        {currentStep === 2 && <Milestones />}
        {currentStep === 3 && <Milestones />}
        {currentStep === 4 && <Milestones />}
      </Card>

      <div className="flex gap-x-4">
        {currentStep > 0 && (
          <Button
            className="w-full bg-red-800/30 hover:bg-red-800/20 text-red-800"
            onClick={handleBack}
          >
            Back
          </Button>
        )}

        <Button
          className="w-full bg-red-800 hover:bg-red-800/90 text-white"
          onClick={handleContinue}
        >
          {currentStep === 2 ? "Submit" : "Continue"}
        </Button>
      </div>

      <SubmitApprovalModal
        isOpen={currentStep === 3}
        onClose={() => setCurrentStep(2)}
        handleContinue={handleContinue}
      />

      <ConfirmationModal
        isOpen={currentStep === 4}
        onClose={() => setCurrentStep(2)}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

function SubmitApprovalModal({ isOpen, onClose, handleContinue }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-w-xl">
        <DialogHeader>
          <div className="mb-4">
            <DialogTitle className="text-black">Approval</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4">
          <div className="mx-auto">
            <label className="block text-sm font-medium mb-4">
              Purchase Requisition Value
            </label>

            <Input
              value="$6,500.00"
              className="bg-gray-200/30 border-none py-8 px-6"
              readOnly
            />

            <div className="block text-md font-medium mt-8 mb-8">
              Based on the value of this project, this request has to pass
              through:
            </div>

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

            <Button
              className="w-full bg-red-800 hover:bg-red-800/90 text-white"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmationModal({ isOpen, onClose, setCurrentStep }) {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-w-lg">
        <DialogHeader>
          <div className="mb-4">
            <DialogTitle className="text-black">Confirmation</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4">
          <div className="mx-auto">
            <div className="mb-12">Are you sure you want to continue?</div>
            <div className="flex justify-between gap-x-4">
              <Button
                className="w-full bg-red-800/30 hover:bg-red-800/20 text-red-800"
                onClick={() => setCurrentStep(2)}
              >
                No, Cancel
              </Button>
              <Button
                className="w-full bg-red-800 hover:bg-red-800/90 text-white"
                onClick={() => navigate(`/purchase/purchasereqsuccess`)}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const PReqDetails = ({ projectFunds }) => {
  const [selectVal, setSelectVal] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Project</label>
        <Select value={selectVal} onValueChange={setSelectVal}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="2034">2034 - VAS Supply Program</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectVal && (
        <div className="space-y-4 mt-10 mb-10 bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm w-[200px]">Project Fund Amount</span>
            <span className="text-red-800 font-medium">
              ${projectFunds.projectFundAmount.toLocaleString()}
            </span>
            <Progress value={100} className="w-1/2 bg-red-800/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm w-[200px]">Soft Commitment</span>
            <span className="text-[#FF6B6B] font-medium">
              ${projectFunds.softCommitment.toLocaleString()}
            </span>
            <Progress value={25} className="w-1/2 bg-[#FF6B6B]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm w-[200px]">Hard Commitment</span>
            <span className="text-[#4A90E2] font-medium">
              ${projectFunds.hardCommitment.toLocaleString()}
            </span>
            <Progress value={34} className="w-1/2 bg-[#4A90E2]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm w-[200px]">Actual</span>
            <span className="text-[#A463F2] font-medium">
              ${projectFunds.actual.toLocaleString()}
            </span>
            <Progress value={12} className="w-1/2 bg-[#A463F2]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm w-[200px]">Balance/Valance</span>
            <span className="text-[#00B5AD] font-medium">
              ${projectFunds.balance.toLocaleString()}
            </span>
            <Progress value={29} className="w-1/2 bg-[#00B5AD]/20" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select defaultValue={null}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Direct, Indirect, Shared indirect (country)..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="indirect">Indirect</SelectItem>
              <SelectItem value="shared">Shared Indirect (country)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            P-Req Number
            <span className="text-xs text-gray-500 ml-1">
              (use for Pure only)
            </span>
          </label>
          <Input placeholder="0000" className="bg-white" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Requester</label>
        <Select defaultValue={null}>
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Mohammad Alathamena" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="mohammad">Mohammad Alathamena</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Procurement Type
          </label>
          <Select defaultValue={null}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Procured Services (Services, Events, Meetings)" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="services">
                Procured Services (Services, Events, Meetings)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Completion Date
          </label>
          <div className="relative">
            <Input placeholder="Select date" className="bg-white" />
            <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CostEstimation = () => {
  const [items, setItems] = useState([
    {
      description: "",
      unit: 1,
      unitCost: 400.0,
      currency: "USD",
      amount: 400.0,
      exchangeRate: 1.4,
      contractTotal: 560,
    },
  ]);

  const amountStatus = {
    projectFundAmount: { value: 20000, color: "#8B3E3E", progress: 100 },
    softCommitment: { value: 5200, color: "#FF6B6B", progress: 26 },
    hardCommitment: { value: 3700, color: "#4A90E2", progress: 18.5 },
    actual: { value: 1000, color: "#A463F2", progress: 5 },
    balanceVariance: { value: 9900, color: "#00B5AD", progress: 49.5 },
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        description: "",
        unit: 1,
        unitCost: 0,
        currency: "USD",
        amount: 0,
        exchangeRate: 1.4,
        contractTotal: 0,
      },
    ]);
  };

  const addFinancialCoding = () => {
    alert("addFinancialCoding");
  };

  const handleUploadSupportingDocuments = () => {
    alert("handleUploadSupportingDocuments");
  };

  return (
    <div className="space-y-8 ">
      {/* Amount Status Section */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#8B3E3E] mb-4">
          Amount Status
        </h2>
        <Card className="p-6 space-y-4 border-none shadow-none">
          {Object.entries(amountStatus).map(
            ([key, { value, color, progress }]) => {
              return (
                <div key={key} className="flex items-center gap-4">
                  <span className="w-40 text-sm font-medium capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .split(/(?=[A-Z])/)
                      .join(" ")}
                  </span>
                  <div className="flex-1">
                    <Progress value={progress} style={{ background: color }} />
                  </div>
                  <span
                    className="w-24 text-right font-medium"
                    style={{ color }}
                  >
                    ${value.toLocaleString()}
                  </span>
                </div>
              );
            }
          )}
        </Card>
      </div>

      {/* Cost Estimation Section */}
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-semibold text-[#8B3E3E] mb-4">
          Cost Estimation and Specification
        </h2>
        {items.map((item, index) => (
          <Card className="bg-[#FDF6F6] p-6 mb-4 border-none" key={index}>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Input
                    placeholder="Write here..."
                    className="bg-white border-none"
                    value={item.description}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <Input
                    type="number"
                    className="bg-white w-20 border-none"
                    value={item.unit}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Unit Cost
                  </label>
                  <Input
                    type="number"
                    className="bg-white w-28 border-none"
                    value={item.unitCost}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Select Project
                  </label>
                  <Select defaultValue="USD">
                    <SelectTrigger className="w-32 bg-white border-none">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollars</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Exchange Rate
                  </label>
                  <Input
                    type="number"
                    className="bg-white w-20 border-none"
                    value={item.exchangeRate}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Exchange Rate
                  </label>
                  <div className="bg-[#D1E9D5] px-4 py-2 rounded w-28 text-center">
                    {item.contractTotal}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="ghost"
                  className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2"
                  onClick={addFinancialCoding}
                >
                  <Plus className="h-4 w-4" />
                  Add Financial Coding
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <div className="flex justify-end mt-4">
          <Button
            onClick={addNewItem}
            variant="ghost"
            className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2 "
          >
            <Plus className="h-4 w-4" />
            Add More
          </Button>
        </div>

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
      </div>

      <div className="flex justify-between">
        <div className="font-bold text-lg">Upload Supporting Documents</div>
        <Button
          onClick={handleUploadSupportingDocuments}
          variant="outline"
          className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2 "
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <label className="block text-sm font-medium mb-2">
        Input goods technical specification
      </label>
      <Textarea className="bg-white border-none" rows={10} />
    </div>
  );
};

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

export default FormWizard;

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

const steps = [
  { title: "P-Req Details", icon: <ListTodo className="h-5 w-5" /> },
  { title: "Cost Estimation", icon: <RefreshCcw className="h-5 w-5" /> },
  { title: "Milestones", icon: <PauseCircle className="h-5 w-5" /> },
];

const projectFunds = {
  projectFundAmount: 20000,
  softCommitment: 5000,
  hardCommitment: 6800,
  actual: 2400,
  balance: 5800,
};
