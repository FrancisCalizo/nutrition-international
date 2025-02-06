import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Bell } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import { styles } from "./assets/styles";

const App = () => {
  return (
    <Router>
      <div style={styles.layout}>
        <Sidebar />

        <div style={styles.fixedHeader}>
          <h1 style={styles.welcomeText}>Welcome Hannah,</h1>
          <div style={styles.headerRight}>
            <Bell size={24} />
            <button style={styles.createButton}>+ Create New</button>
          </div>
        </div>

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
