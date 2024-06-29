import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Wrapper from "./layout/Wrapper";
import { CssSyntaxError } from "postcss";
import CsvUploader from "./pages/CsvUploader";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/upload" element={<CsvUploader />} />
        <Route path="/recipe" element={<Recipes />} />

      </Routes>
    </div>
  );
}

export default App;
