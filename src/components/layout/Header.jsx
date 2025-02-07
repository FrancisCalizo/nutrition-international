import { Bell } from "lucide-react";

import { useLocation } from "react-router";
import { styles } from "../../assets/styles";
import path from "path";

export default function Header({ setIsModalOpen }) {
  const { pathname } = useLocation();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const renderButton = () => {
    return (
      <button
        className="bg-red-800"
        style={styles.createButton}
        onClick={handleClick}
      >
        + Create New
      </button>
    );
  };

  return (
    <div style={styles.fixedHeader}>
      <h1 style={styles.welcomeText}>Welcome Hannah,</h1>
      <div style={styles.headerRight}>
        <Bell size={24} />
        {renderButton()}
      </div>
    </div>
  );
}
