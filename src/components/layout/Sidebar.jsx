import { Link } from "react-router";
import { useLocation } from "react-router";

import logo from "../../assets/ni-logo.png";
import { styles } from "../../assets/styles";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menuItems = [
    { icon: "⊞", label: "Dashboard", link: "/" },
    { icon: "🎁", label: "Grants", link: "/grants" },
    { icon: "📑", label: "Projects", link: "/projects" },
    {
      icon: "🔄",
      label: "Purchase Requisition",

      link: "/purchase",
    },
    {
      icon: "📄",
      label: "Contract Management",

      link: "/contract",
    },
    { icon: "✈", label: "Milestones", link: "/milestones" },
    { icon: "📋", label: "PRF", link: "/prf" },
    { icon: "📝", label: "Approvals (11)", link: "/approvals" },
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
              className="hover:bg-gray-100"
              style={{
                ...styles.navItem,
                ...(item.link === pathname
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
