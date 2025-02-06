import logo from "../assets/ni-logo.png";

import { styles } from "../assets/styles";

export default function Sidebar() {
  const menuItems = [
    { icon: "⊞", label: "Dashboard", active: true },
    { icon: "🎁", label: "Grants", active: false },
    { icon: "📑", label: "Projects", active: false },
    { icon: "🔄", label: "Purchase Requisition", active: false },
    { icon: "📄", label: "Contract Management", active: false },
    { icon: "✈", label: "Milestones", active: false },
    { icon: "📋", label: "PRF", active: false },
    { icon: "📝", label: "Approvals (11)", active: false },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <img
          src={logo}
          alt="Nutrition International"
          style={{ width: "200px" }}
        />
      </div>
      <nav style={styles.nav}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.navItem,
              ...(item.active ? styles.navItemActive : styles.navItemInactive),
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div style={styles.logout}>
        <span style={styles.icon}>↩</span>
        <span>Logout</span>
      </div>
    </div>
  );
}
