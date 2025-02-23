import { useState } from "react";
import { useNavigate } from "react-router";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ListTodo, RefreshCcw, PauseCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CostEstimation from "./CostEstimation";
import PurchaseReqDetails from "./PurchaseReqDetails";
import Milestones from "./Milestones";

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
        {currentStep === 0 && (
          <PurchaseReqDetails projectFunds={projectFunds} />
        )}
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

export function FinancialCodingModal({ isOpen, onClose }) {
  const handleAddCoding = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-8 max-w-5xl">
        <DialogHeader>
          <div className="mb-4">
            <DialogTitle>Financial Coding</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {financialCodingInputs.map((e) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                {e}
              </label>
              <Input
                type="text"
                className="bg-gray-50 text-lg font-medium text-gray-900"
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-red-800 hover:bg-red-800/90 text-white"
          onClick={handleAddCoding}
        >
          Add Coding
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const financialCodingInputs = [
  "Donor Grant",
  "Natural Account",
  "Department",
  "Cost-Center",
  "Expense Category",
  "Fund Budget Line",
  "Area of Work",
  "Program",
  "Project",
  "Contract",
  "Activity",
  "Location",
  "Area",
  "Restriction",
];

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
