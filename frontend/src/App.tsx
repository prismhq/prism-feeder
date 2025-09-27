import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Feeds from "./components/Feeds";
import Entries from "./components/Entries";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <h2>Prism Feeder</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/feeds">Feeds</Link>
          </li>
          <li>
            <Link to="/entries">Entries</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
