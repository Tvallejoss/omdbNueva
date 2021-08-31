import { Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Navbar } from "./components/Navbar"
import { CardMovie } from "./components/CardMovie";

function App() {
  return (
    <div className="App">
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/" render={() => <Navbar />} />
      <Route exact path="/card" render={() => <CardMovie />} />

    </div>
  );
}

export default App;
