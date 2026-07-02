function Header() {
  return (
    <div
      style={{
        background: "white",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2 style={{ margin: 0 }}>🏠 Inicio</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "18px",
        }}
      >
        🔔

        👤 Dayra
      </div>
    </div>
  );
}

export default Header;