import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBAr";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
// import { authenticate } from "./services/auth";
import { authenticate } from "./store/session";
import PhotoUploadPage from "./components/PhotoUploadPage"
<<<<<<< HEAD
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
=======
import PhotoFeed from "./components/PostFeed"
>>>>>>> main

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>

        <Route path="/sign-up" exact={true}>
          
          <SignUpPage />
        </Route>
        <Route path="/posts" exact={true}>
          <PhotoUploadPage />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
          <PhotoFeed />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
