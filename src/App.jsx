import { Outlet } from "react-router-dom";
import "./global.scss";
import NavBar from "./components/navbar/NavBar.jsx"
function App() {
  return (
    <div style={{backgroundColor: "#F1F4F9"}}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
