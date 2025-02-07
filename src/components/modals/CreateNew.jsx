import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateNew({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* @ts-ignore */}
      <DialogContent className="bg-white">
        {/* @ts-ignore */}
        <DialogHeader>
          <div className="mb-4">
            {/* @ts-ignore */}
            <DialogTitle className="text-red-800">+ Create New</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col">
          <button
            className="bg-gray-100 p-6 text-left rounded-md mb-5 text-xl hover:text-white cursor-pointer hover:bg-red-800"
            onClick={() => console.log("Create Project")}
          >
            Create Project
          </button>
          <button
            className="bg-gray-100 p-6 text-left rounded-md mb-5 text-xl hover:text-white cursor-pointer hover:bg-red-800"
            onClick={() => console.log("Create Purchase Requisition")}
          >
            Create Purchase Requisition
          </button>
          <button
            className="bg-gray-100 p-6 text-left rounded-md mb-5 text-xl hover:text-white cursor-pointer hover:bg-red-800"
            onClick={() => console.log("Create Contract")}
          >
            Create Contract
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
