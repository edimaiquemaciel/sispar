import { Outlet } from "react-router-dom";
import "./global.scss";
import NavBarTeste from "./components/navbar/NavBarTeste";
function App() {
  return (
    <>
      <NavBarTeste />
      <Outlet />
    </>
  );
}

export default App;
