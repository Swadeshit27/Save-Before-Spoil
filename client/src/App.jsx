import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dashboardnew from "./pages/Dashboardnew";
import Landing from "./pages/Landing";
import CsvUploader from "./pages/CsvUploader";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import DonateToFoodBank from "./pages/DonateToFoodBank";
import { useSelector } from "react-redux"; 
import FoodBankDashboard from "./pages/FoodBankDashboard";
import { Spinner } from "flowbite-react"; 
import ChatWithFoodBank from "./pages/ChatWithFoodBank";
import Authlayout from "./layout/Authlayout";

function App() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="w-full min-h-screen ">
      {loading && (
        <div className="w-full h-screen top-0 fixed left-0 z-[999] bg-black/30 flex items-center justify-center">
          <Spinner
            color="success"
            size={"xl"}
            aria-label="Success spinner example"
          />
        </div>
      )}
      <Routes>
        <Route
          path="/dashboard-1"
          element={
            <Authlayout>
              <Dashboardnew />
            </Authlayout>
          }
        />
        <Route
          path="/dashboard-2"
          element={
            <Authlayout>
              <Dashboard />
            </Authlayout>
          }
        />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<CsvUploader />} /> */}
        <Route
          path="/food-bank-dashboard"
          element={
            <Authlayout>
            <FoodBankDashboard />
            </Authlayout>
          } 
          />
        {/* <Route path="/recipe" */}
        <Route
          path="/login"
          element={
            <Authlayout authentication={false}>
              <Login />
            </Authlayout>
          }
        />
        <Route
          path="/signup"
          element={
            <Authlayout authentication={false}>
              <SignUp />
            </Authlayout>
          }
        />
        <Route
          path="/profile"
          element={
            <Authlayout authentication>
              <Profile />
            </Authlayout>
          }
        />
        <Route
          path="/upload"
          element={
            <Authlayout authentication>
              <CsvUploader />
            </Authlayout>
          }
        />
        <Route
          path="/recipe"
          element={
            <Authlayout authentication>
              <Recipes />
            </Authlayout>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <Authlayout authentication>
              <ChatWithFoodBank />
            </Authlayout>
          }
        />
        <Route
          path="/donate-to-food-bank"
          element={
            <Authlayout authentication>
              <DonateToFoodBank />
            </Authlayout>
          }
        />
        <Route
          path="/"
          element={
            <Authlayout authentication={false}>
              <Landing />
            </Authlayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
