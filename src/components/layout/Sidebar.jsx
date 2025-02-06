import { Link } from "react-router";

import logo from "../../assets/ni-logo.png";
import { styles } from "../../assets/styles";

export default function Sidebar() {
  const menuItems = [
    { icon: "⊞", label: "Dashboard", active: true, link: "/" },
    { icon: "🎁", label: "Grants", active: false, link: "/grants" },
    { icon: "📑", label: "Projects", active: false, link: "/projects" },
    {
      icon: "🔄",
      label: "Purchase Requisition",
      active: false,
      link: "/purchase",
    },
    {
      icon: "📄",
      label: "Contract Management",
      active: false,
      link: "/contract",
    },
    { icon: "✈", label: "Milestones", active: false, link: "/milestones" },
    { icon: "📋", label: "PRF", active: false, link: "/prf" },
    { icon: "📝", label: "Approvals (11)", active: false, link: "/approvals" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <img src={logo} alt="Nutrition International" style={styles.logoImg} />
      </div>
      <nav style={styles.nav}>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} style={{ textDecoration: "none" }}>
            <div
              style={{
                ...styles.navItem,
                ...(item.active
                  ? styles.navItemActive
                  : styles.navItemInactive),
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
      <div style={styles.logout}>
        <span style={styles.icon}>↩</span>
        <span>Logout</span>
      </div>
    </div>
  );
}
