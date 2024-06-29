import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dashboardnew from "./pages/Dashboardnew";
import Landing from "./pages/Landing";
import Wrapper from "./layout/Wrapper";
import CsvUploader from "./pages/CsvUploader";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
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
              <Dashboardnew />
            </Wrapper>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/upload" element={<CsvUploader />} />
        <Route path="/recipe" element={<Recipes />} />
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
        <Route path="/Landing" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
