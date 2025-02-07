import { styles } from "../assets/styles";
import PropTypes from "prop-types";

export default function StatCard(props) {
  const { title, value, color, toggle } = props;
  return (
    <div style={{ ...styles.statCard, backgroundColor: color }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div>{title}</div>
        {toggle && (
          <div
            style={{
              width: "36px",
              height: "20px",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                right: "2px",
                top: "2px",
              }}
            />
          </div>
        )}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
