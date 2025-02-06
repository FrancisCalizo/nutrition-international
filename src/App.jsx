import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Overview from "./components/links/Overview";
import Header from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";
import CreateNew from "./components/modals/CreateNew";

import { styles } from "./assets/styles";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <div style={styles.layout}>
        <Sidebar />

        <Header setIsModalOpen={setIsModalOpen} />

        <CreateNew isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Dashboard>
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        </Dashboard>
      </div>
    </Router>
  );
}
