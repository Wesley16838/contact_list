import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactPage from "./containers/ContactPage";
import ContactCreatePage from "./containers/ContactCreatePage";
import ContactEditPage from "./containers/ContactEditPage";
import ErrorPage from "./containers/ErrorPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/edit/:id" component={ContactEditPage} />
        <Route exact path="/create" component={ContactCreatePage} />
        <Route exact path="/" component={ContactPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
