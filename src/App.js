// pages
import Landing from "./pages/Landing";

// components
import Nav from "../src/components/Nav"
import FAQ from "../src/components/FAQ"

// style
import "../src/styles/App.css";

function App() {
  return (
    <>
    <Nav />
      <div className="App">
        <Landing />
      </div>

      
      <FAQ/>
      
    </>
  );
}

export default App;
