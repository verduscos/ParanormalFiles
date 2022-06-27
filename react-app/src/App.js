import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CreateSightingForm from './components/CreateSightingForm/CreateSightingForm'
import ImageForm from './components/ImageForm/ImageForm';
import EditForm from './components/EditForm/EditForm';
import { authenticate } from './store/session';
import CreateNav from './components/CreateSightingForm/CreateNav';
import NotFound from './components/NotFound/NotFound';
import Main from './components/Main';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Main />
        </Route>
        <Route path='/favorites' exact={true}>
          <Main />
        </Route>
        <Route path='/mysightings' exact={true}>
          <Main />
        </Route>
        <Route path='/sightings/:sightingId' exact={true} >
          <Main />
        </Route>
        <ProtectedRoute path='/report' exact={true} >
          <CreateSightingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/sightings/edit/:sightingId' exact={true} >
          <EditForm />
        </ProtectedRoute>
        <ProtectedRoute path='/sightings/:sightingId/images' exact={true} >
          <CreateNav />
          <ImageForm />
        </ProtectedRoute>
        <Route path="/sightings/search/:string" exact={true}>
          <Main />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
