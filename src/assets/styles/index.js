export const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
  },

  logo: {
    marginBottom: "2rem",
  },
  logoImg: {
    width: "200px",
  },
  nav: {
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    marginBottom: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  navItemActive: {
    backgroundColor: "#b91c1c",
    color: "white",
  },
  navItemInactive: {
    color: "#4b5563",
  },
  icon: {
    marginRight: "0.75rem",
  },
  logout: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem",
    color: "#b91c1c",
    cursor: "pointer",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  statCard: {
    padding: "1.5rem",
    borderRadius: "0.5rem",
    color: "white",
  },
  projectsSection: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    marginBottom: "2rem",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr",
    gap: "1.5rem",
  },
  projectStats: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
};
