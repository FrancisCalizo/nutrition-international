import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

const PurchaseReqDetails = ({ projectFunds }) => {
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

export default PurchaseReqDetails;
