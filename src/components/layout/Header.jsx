import { Bell } from "lucide-react";

import { useLocation } from "react-router";

import path from "path";

export default function Header({ setIsModalOpen }) {
  const { pathname } = useLocation();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const renderButton = () => {
    return (
      <button
        className="bg-red-800 text-white py-2 px-4 rounded-md border-none cursor-pointer"
        onClick={handleClick}
      >
        + Create New
      </button>
    );
  };

  return (
    <div className="fixed top-0 left-[270px] right-0 h-[80px] bg-[#f3f4f6] flex justify-between items-center px-8 z-2 border-b border-[#e5e7eb]">
      <h1 className="text-xl font-semibold">Welcome Hannah,</h1>
      <div className="flex items-center gap-4">
        <Bell size={24} />
        {renderButton()}
      </div>
    </div>
  );
}
