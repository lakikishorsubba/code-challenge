import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Features />
      <h1 className="text-3xl font-bold underline"></h1>
      <Footer />
    </>
  );
}

export default App;
