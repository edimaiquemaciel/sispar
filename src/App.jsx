import { Outlet } from "react-router-dom";
import "./global.scss";
import NavBar from "./components/navbar/NavBar.jsx"
function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
