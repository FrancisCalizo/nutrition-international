// @ts-nocheck
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ListTodo, RefreshCcw, PauseCircle } from "lucide-react";
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
    <div className="max-w-4xl mx-auto p-6 space-y-6 mt-[-60px]">
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
            className={`flex flex-col items-center w-1/3 ${
              index === currentStep ? "text-[#8B3E3E]" : "text-gray-400"
            }`}
          >
            <div
              className={`p-3 rounded-full mb-2 ${
                index === currentStep ? "bg-[#8B3E3E]/10" : "bg-gray-100"
              }`}
            >
              {step.icon}
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>

      <Card className="p-6">{renderStep()}</Card>

      <Button
        className="w-full bg-red-800 hover:bg-red-800/90 text-white"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

const PReqDetails = ({ projectFunds }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Select Project</label>
        <Select defaultValue="2034">
          <SelectTrigger>
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2034">2034 - VAS Supply Program</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Project Fund Amount</span>
          <span className="text-[#8B3E3E] font-medium">
            ${projectFunds.projectFundAmount.toLocaleString()}
          </span>
          <Progress
            value={100}
            className="w-1/2 bg-[#8B3E3E]/20"
            indicatorClassName="bg-[#8B3E3E]"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Soft Commitment</span>
          <span className="text-[#FF6B6B] font-medium">
            ${projectFunds.softCommitment.toLocaleString()}
          </span>
          <Progress
            value={25}
            className="w-1/2 bg-[#FF6B6B]/20"
            indicatorClassName="bg-[#FF6B6B]"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Hard Commitment</span>
          <span className="text-[#4A90E2] font-medium">
            ${projectFunds.hardCommitment.toLocaleString()}
          </span>
          <Progress
            value={34}
            className="w-1/2 bg-[#4A90E2]/20"
            indicatorClassName="bg-[#4A90E2]"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Actual</span>
          <span className="text-[#A463F2] font-medium">
            ${projectFunds.actual.toLocaleString()}
          </span>
          <Progress
            value={12}
            className="w-1/2 bg-[#A463F2]/20"
            indicatorClassName="bg-[#A463F2]"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Balance/Valance</span>
          <span className="text-[#00B5AD] font-medium">
            ${projectFunds.balance.toLocaleString()}
          </span>
          <Progress
            value={29}
            className="w-1/2 bg-[#00B5AD]/20"
            indicatorClassName="bg-[#00B5AD]"
          />
        </div>
      </div>

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

const CostEstimation = () => (
  <div className="h-64 flex items-center justify-center text-gray-500">
    Cost Estimation Form (Step 2)
  </div>
);

const Milestones = () => (
  <div className="h-64 flex items-center justify-center text-gray-500">
    Milestones Form (Step 3)
  </div>
);

export default FormWizard;
