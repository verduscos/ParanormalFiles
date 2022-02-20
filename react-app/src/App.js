import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Sightings from './components/sightings/Sightings';
import SingleSighting from './components/SingleSighting/SingleSighting';
import CreateSightingForm from './components/CreateSightingForm/CreateSightingForm'
import ImageForm from './components/ImageForm/ImageForm';
import EditForm from './components/EditForm/EditForm';
import UploadPrompt from './components/AddImagePrompt';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
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
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <Navigation isLoaded={loaded} />
          <Sightings />
        </Route>
        <Route path='/sightings/:sightingId' exact={true} >
          <SingleSighting />
        </Route>
        <Route path='/report' exact={true} >
          <CreateSightingForm />
        </Route>
        <Route path='/sightings/edit/:sightingId' exact={true} >
          <EditForm />
        </Route>
        <Route path='/sightings/:sightingId/images' exact={true} >
          <ImageForm />
        </Route>
        <Route path='/upload' exact={true} >
          <UploadPrompt />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
