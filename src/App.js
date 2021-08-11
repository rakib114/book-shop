import './App.css';
import AddBook from './components/AddBook/AddBook';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import LogIn from '../src/components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import AdminNavBar from './components/AdminNavBar/AdminNavBar';
import CheckOut from './components/CheckOut/CheckOut';
import ManageBook from './components/ManageBook/ManageBook';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/admin">
            <AdminNavBar></AdminNavBar>
          </PrivateRoute>
          <PrivateRoute path="/dealse">
            <CheckOut></CheckOut>
          </PrivateRoute>
          <Route path="/addBook">
            <AddBook></AddBook>
          </Route>
          <Route path="/manageBook">
            <ManageBook></ManageBook>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>

  );
}

export default App;
