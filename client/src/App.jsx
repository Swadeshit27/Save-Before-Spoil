import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Dashboardnew from "./pages/Dashboardnew";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Wrapper from "./layout/Wrapper";
import { CssSyntaxError } from "postcss";
import CsvUploader from "./pages/CsvUploader";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<CsvUploader />} />
        <Route path="/Landing" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
