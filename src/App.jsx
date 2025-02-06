import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Bell, X } from "lucide-react";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import { styles } from "./assets/styles";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div style={styles.layout}>
        <Sidebar />

        <div style={styles.fixedHeader}>
          <h1 style={styles.welcomeText}>Welcome Hannah,</h1>
          <div style={styles.headerRight}>
            <Bell size={24} />
            <button
              style={styles.createButton}
              onClick={() => setIsModalOpen(true)}
            >
              + Create New
            </button>
          </div>
        </div>

        <CreateNewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const CreateNewModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <div className="mb-4">
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
};

export default App;
