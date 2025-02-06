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
          <div className="modal-header">
            <DialogTitle className="modal-title">+ Create New</DialogTitle>
            <button onClick={onClose} className="close-button">
              <X size={20} />
            </button>
          </div>
        </DialogHeader>
        <div className="modal-options">
          <button
            className="modal-option"
            onClick={() => console.log("Create Project")}
          >
            Create Project
          </button>
          <button
            className="modal-option"
            onClick={() => console.log("Create Purchase Requisition")}
          >
            Create Purchase Requisition
          </button>
          <button
            className="modal-option"
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
