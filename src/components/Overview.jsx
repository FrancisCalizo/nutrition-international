import { PieChart, Pie, Cell } from "recharts";

import StatCard from "./StatCard";
import { styles } from "../assets/styles";

export default function Overview() {
  const COLORS = ["#64a5f6", "#1e4d5f", "#f4a261"];

  const pieData = [
    { name: "Ongoing", value: 45 },
    { name: "Completed", value: 25 },
    { name: "Inactive", value: 30 },
  ];

  return (
    <div>
      <h2 style={styles.sectionTitle}>Dashboard Overview</h2>
      <div style={styles.statsGrid}>
        <StatCard
          title="Active Grants"
          value="30"
          color="#b91c1c"
          toggle={true}
        />
        <StatCard title="Active Projects" value="23" color="#2dd4bf" />
        <StatCard title="Purchase Requisitions" value="42" color="#f87171" />
        <StatCard title="Contracts" value="42" color="#a855f7" />
      </div>

      <h2 style={styles.sectionTitle}>Projects Overview</h2>
      <div style={styles.projectsSection}>
        <div style={styles.projectsGrid}>
          <div style={styles.projectStats}>
            <StatCard title="Total Projects" value="53" color="#2dd4bf" />
            <StatCard title="Inactive Projects" value="4" color="#f4a261" />
            <StatCard title="Ongoing Project" value="33" color="#64a5f6" />
            <StatCard title="Completed Project" value="16" color="#1e4d5f" />
          </div>
          <div />
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Purchase Requisition Overview</h2>
      <div style={styles.statsGrid}>
        <StatCard title="All P-Req" value="102" color="#2dd4bf" />
        <StatCard title="Active P-Req" value="64" color="#64a5f6" />
        <StatCard title="Inactive P-Req" value="9" color="#f4a261" />
        <StatCard title="Completed P-Req" value="29" color="#1e4d5f" />
      </div>
    </div>
  );
}
