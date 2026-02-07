import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtecteRoute from "./components/common/ProtecteRoute";
import { PublicLayout } from "./layouts/PublickLayout";
import OpenRoute from "./components/common/OpenRoute";


function App() {
  return (
      <div className="bg-black text-white/80 min-h-screen">
        <Routes>
          <Route element={<OpenRoute />}>
            <Route element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="auth" element={<Auth />} />
            </Route>
          </Route>
          <Route element={<ProtecteRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
  );
}


export default App;
