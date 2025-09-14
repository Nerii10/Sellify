import { useEffect } from "react";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import PageContainer from "./components/pagecontainer/PageContainer";
import Sidebar from "./components/sidebar/Sidebar";
import { useAppContext } from "./logic/AppContext";
import Items from "./pages/items/Items";
import Sales from "./pages/sales/Sales";
import { useLocation, Routes, Route } from "react-router-dom";
import Panel from "./pages/panel/Panel";
import Auth from "./pages/auth/Auth";

function App() {
  const { windowWidth, windowMobileWidth } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  
  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="app-content">
        <Sidebar />
        <div className="app-content-page-container">
          <PageContainer>
            <Routes>
              <Route path="/Panel" element={<Panel />} />
              <Route path="/Sprzedaze" element={<Sales />} />
              <Route path="/Przedmioty" element={<Items />} />
              <Route path="/Autoryzacja" element={<Auth />} />
              <Route path="*" element={<Items />} />{" "}
            </Routes>
          </PageContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
