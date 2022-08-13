// pages
import Landing from "./pages/Landing";

// components
import Nav from "../src/components/Nav"

// style
import "../src/styles/App.css";

function App() {
  return (
    <>
    <Nav />
      <div className="App">
        <Landing />
      </div>
    </>
  );
}

export default App;
