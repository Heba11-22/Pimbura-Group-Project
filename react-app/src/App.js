import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import PhotoUploadPage from "./components/PhotoUploadPage"
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
import PhotoFeed from "./components/PhotoFeed/PostFeed"
import UserProfile from "./components/UserProfile/UserProfile";
import ExplorePage from "./components/ExplorePage";
import Image from "./components/og-image/Image";

function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpPage />
        </Route>
        <Route path="/explore" exact={true}>
          <NavBar />
          <ExplorePage />
        </Route>
        <Route path="/upload" exact={true}>
          <NavBar />
          <PhotoUploadPage />
        </Route>
        <Route path='/user/:userId' exact={true}>
          <NavBar />
          <UserProfile />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <NavBar />
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true}>
          <NavBar />
          <PhotoFeed />
        </ProtectedRoute>
        <ProtectedRoute path="/images/screenshot">
          <Image/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
