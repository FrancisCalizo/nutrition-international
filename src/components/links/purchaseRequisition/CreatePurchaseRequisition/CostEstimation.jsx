import { useState } from "react";

import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FinancialCodingModal } from ".";

const CostEstimation = () => {
  const [isFinCodingModalOpen, setIsFinCodingModalOpen] = useState(false);
  const [isUploadSupportingDocs, setIsUploadSupportingDocs] = useState(false);
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

  const handleUploadSupportingDocuments = () => {
    setIsUploadSupportingDocs(true);
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
                  className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2 cursor-pointer"
                  onClick={() => setIsFinCodingModalOpen(true)}
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
            className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2 cursor-pointer"
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
          className="text-[#8B3E3E] hover:text-[#8B3E3E]/80 gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {isUploadSupportingDocs && (
        <Card className="bg-teal-100 p-6 mb-4 border-none mt-14 flex justify-between">
          <div>
            <label className="block text-sm font-medium mb-2">
              Documents Title
            </label>
            <Input className="max-w-[200px] bg-white border-none" readOnly />
            <div className="underline mt-2"> Terms_of_reference.pdf</div>
          </div>
          <div>
            <button
              className="bg-red-800 p-2 rounded-md text-white cursor-pointer"
              onClick={() => setIsUploadSupportingDocs(false)}
            >
              <Trash2 className="text-sm" />
            </button>
          </div>
        </Card>
      )}

      <label className="block text-sm font-medium mb-2">
        Input goods technical specification
      </label>
      <Textarea className="bg-white border-none" rows={10} />

      <FinancialCodingModal
        isOpen={isFinCodingModalOpen}
        onClose={() => setIsFinCodingModalOpen(false)}
      />
    </div>
  );
};

export default CostEstimation;
