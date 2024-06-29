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
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import PublicRoute from "./components/PublicRoute";
import ChatWithFoodBank from "./pages/ChatWithFoodBank";

function App() {
  const { loading } = useSelector(state => state.auth);
  return (
    <div className="w-full min-h-screen ">
      {loading && <div className="w-full h-screen top-0 fixed left-0 z-[999] bg-black/30 flex items-center justify-center"> <Spinner color="success" size={'xl'} aria-label="Success spinner example" /></div>}
      <Routes>
        <Route
          path="/dashboard-1"
          element={
            <PublicRoute>
              <Dashboardnew />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard-2"
          element={
            // <PublicRoute>
              <Dashboard />
            // </PublicRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            // <PublicRoute>
              <ChatWithFoodBank />
            // </PublicRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<CsvUploader />} />
        <Route path="/recipe"
          element={
            <PublicRoute >
              <Recipes />
            </PublicRoute>
          } />
        <Route path="/options"
          element={
            <PublicRoute>
              <Options />
            </PublicRoute>
          } />
        <Route path="/donate-to-food-bank"
          element={
            <Wrapper>
              <DonateToFoodBank />
            </Wrapper>
          } />
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
