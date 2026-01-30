import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
// import Example from "./pages/Example";
import Header from "./components/common/Header";
import Auth from "./pages/Auth";


function App() {
  return (
    <div className="bg-black text-white/80 ">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/exa" element={<Example />}/> */}
        <Route path="/auth" element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
