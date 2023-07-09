import { Route, Routes } from "react-router-dom";
import "./App.css";
import Play from "./components/Play/Play";
import Home from "./components/Home/Home";
import Finish from "./components/Finish/Finish";
import Notfound from "./components/Notfound/Notfound";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play/:category/:id" element={<Play />} />
          <Route path="finish" element={<Finish />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
