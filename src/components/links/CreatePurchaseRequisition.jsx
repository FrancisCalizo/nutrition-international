import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectFunds, setProjectFunds] = useState({
    projectFundAmount: 20000,
    softCommitment: 5000,
    hardCommitment: 6800,
    actual: 2400,
    balance: 5800,
  });

  const steps = [
    { title: "P-Req Details", icon: <ListTodo className="h-5 w-5" /> },
    { title: "Cost Estimation", icon: <RefreshCcw className="h-5 w-5" /> },
    { title: "Milestones", icon: <PauseCircle className="h-5 w-5" /> },
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PReqDetails projectFunds={projectFunds} />;
      case 1:
        return <CostEstimation />;
      case 2:
        return <Milestones />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-6 space-y-6 mt-[-60px]">
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          Step {currentStep + 1} of {steps.length}: Create Purchase Requisition
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

      <Card className="p-6 border-none">{renderStep()}</Card>

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
          Continue
        </Button>
      </div>
    </div>
  );
};

const PReqDetails = ({ projectFunds }) => {
  const [selectVal, setSelectVal] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Project</label>
        <Select value={selectVal} onValueChange={setSelectVal}>
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="2034">2034 - VAS Supply Program</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectVal && (
        <div className="space-y-4 mt-10 mb-10">
          <div className="flex justify-between items-center">
            <span className="text-sm">Project Fund Amount</span>
            <span className="text-red-800 font-medium">
              ${projectFunds.projectFundAmount.toLocaleString()}
            </span>
            <Progress value={100} className="w-1/2 bg-red-800/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Soft Commitment</span>
            <span className="text-[#FF6B6B] font-medium">
              ${projectFunds.softCommitment.toLocaleString()}
            </span>
            <Progress value={25} className="w-1/2 bg-[#FF6B6B]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Hard Commitment</span>
            <span className="text-[#4A90E2] font-medium">
              ${projectFunds.hardCommitment.toLocaleString()}
            </span>
            <Progress value={34} className="w-1/2 bg-[#4A90E2]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Actual</span>
            <span className="text-[#A463F2] font-medium">
              ${projectFunds.actual.toLocaleString()}
            </span>
            <Progress value={12} className="w-1/2 bg-[#A463F2]/20" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Balance/Valance</span>
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Direct, Indirect, Shared indirect (country)..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="indirect">Indirect</SelectItem>
              <SelectItem value="shared">Shared Indirect (country)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">P-Req Number</label>
          <Input placeholder="0000" className="bg-white" />
          <span className="text-xs text-gray-500 mt-1">
            (use for Pure only)
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Requester</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Mohammad Alathamena" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mohammad">Mohammad Alathamena</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Procurement Type
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Procured Services (Services, Events, Meetings)" />
            </SelectTrigger>
            <SelectContent>
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
    balanceValance: { value: 9900, color: "#00B5AD", progress: 49.5 },
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

  return (
    <div className="space-y-8 p-6">
      {/* Amount Status Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#8B3E3E] mb-4">
          Amount Status
        </h2>
        <Card className="p-6 space-y-4">
          {Object.entries(amountStatus).map(
            ([key, { value, color, progress }]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="w-40 text-sm font-medium">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .split(/(?=[A-Z])/)
                    .join(" ")}
                </span>
                <div className="flex-1">
                  <Progress
                    value={progress}
                    className="h-2"
                    indicatorClassName={`bg-[${color}]`}
                  />
                </div>
                <span className="w-24 text-right font-medium" style={{ color }}>
                  ${value.toLocaleString()}
                </span>
              </div>
            )
          )}
        </Card>
      </div>

      {/* Cost Estimation Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#8B3E3E] mb-4">
          Cost Estimation and Specification
        </h2>
        <Card className="bg-[#FDF6F6] p-6">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2">
                  <Input
                    placeholder="Write here..."
                    className="bg-white"
                    value={item.description}
                  />
                </div>
                <Input
                  type="number"
                  className="bg-white w-20"
                  value={item.unit}
                />
                <Input
                  type="number"
                  className="bg-white w-28"
                  value={item.unitCost}
                />
                <div className="flex gap-2 items-center">
                  <Select defaultValue="USD">
                    <SelectTrigger className="w-32 bg-white">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollars</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    className="bg-white w-28"
                    value={item.amount}
                    readOnly
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    className="bg-white w-20"
                    value={item.exchangeRate}
                  />
                  <div className="bg-[#D1E9D5] px-4 py-2 rounded w-28 text-center">
                    {item.contractTotal}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Financial Coding
              </Button>
              <Button
                onClick={addNewItem}
                variant="ghost"
                className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2"
              >
                <Plus className="h-4 w-4" />
                Add More
              </Button>
            </div>
          </div>
        </Card>
      </div>
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
    <div className="max-w-5xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-red-700">
            Purchase Requisition Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <h2 className="text-lg font-medium mb-4">Project Value</h2>
            <Input value="$6,500.00" className="max-w-[200px]" readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-700">Define Milestone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-red-700 text-white">
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
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
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
