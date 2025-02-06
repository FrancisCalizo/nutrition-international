import { Bell } from "lucide-react";

import { styles } from "../../assets/styles";

export default function Header({ setIsModalOpen }) {
  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div style={styles.fixedHeader}>
      <h1 style={styles.welcomeText}>Welcome Hannah,</h1>
      <div style={styles.headerRight}>
        <Bell size={24} />
        <button style={styles.createButton} onClick={handleClick}>
          + Create New
        </button>
      </div>
    </div>
  );
}
