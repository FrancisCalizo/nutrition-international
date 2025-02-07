import { Routes, Route } from "react-router";
import { useState } from "react";

import Dashboard from "./components/layout/Dashboard";
import Sidebar from "./components/layout/Sidebar";

import CreateNew from "./components/modals/CreateNew";

import Overview from "./components/links/Overview";
import Grants from "./components/links/Grants";
import Projects from "./components/links/Projects";
import Purchase from "./components/links/Purchase";
import Contract from "./components/links/Contract";
import Milestones from "./components/links/Milestones";
import Prf from "./components/links/Prf";
import Approvals from "./components/links/Approvals";

import { styles } from "./assets/styles";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={styles.layout}>
      <Sidebar />

      <CreateNew isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <Dashboard>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/prf" element={<Prf />} />
          <Route path="/approvals" element={<Approvals />} />
        </Routes>
      </Dashboard>
    </div>
  );
}
