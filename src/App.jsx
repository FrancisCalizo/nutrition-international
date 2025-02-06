import { Bell } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import { styles } from "./assets/styles";

const App = () => {
  return (
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
        <Overview />
      </main>
    </div>
  );
};

export default App;
