import { BrowserRouter, Routes, Route} from "react-router";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import MyProducts from "./pages/MyProducts";

import "../styles/style.css";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/Registration"
          element={<Registration />}
        />

        <Route
          path="/MyProducts"
          element={<MyProducts />}
        />

      </Routes>
    </BrowserRouter>
  );
}