import { Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Navbar } from "./components/Navbar"
import { CardMovie } from "./components/CardMovie";
import { Profile } from "./components/components/Profile";

function App() {
  return (
    <div className="App">
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/" render={() => <Navbar />} />
      {/* <Route exact path="/" render={() => <CardMovie />} /> */}
      <Route exact path="/Profile/:id" render={() => <Profile />} />

    </div>
  );
}

export default App;
