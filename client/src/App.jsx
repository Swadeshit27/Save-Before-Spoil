import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./layout/Wrapper";
import CsvUploader from "./pages/CsvUploader";
import Options from "./pages/Options";
import DonateToFoodBank from "./pages/DonateToFoodBank";

function App() {
  return (
    <div className="w-full min-h-screen ">
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<CsvUploader />} />
        <Route path="/options"
          element={
            <Wrapper>
              <Options />
            </Wrapper>
          } />
        <Route path="/donate-to-food-bank"
          element={
            <Wrapper>
              <DonateToFoodBank />
            </Wrapper>
          } />
      </Routes>
    </div>
  );
}

export default App;
