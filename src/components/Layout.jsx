import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
        }}
      >
        <Header />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;