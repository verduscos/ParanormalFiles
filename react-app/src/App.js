import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sightings from './components/sightings/Sightings';
import CreateSightingForm from './components/CreateSightingForm/CreateSightingForm'
import ImageForm from './components/ImageForm/ImageForm';
import EditForm from './components/EditForm/EditForm';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import CreateNav from './components/CreateSightingForm/CreateNav';
import Categories from './components/Categories/Categories';
import Category from './components/Categories/Category';
import NotFound from './components/NotFound/NotFound';
import Search from './components/Search/Search';
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
        <Route path='/sightings/categories/:category' exact={true} >
          <Navigation isLoaded={loaded} />
          <Category />
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
          <Navigation />
          <Sightings />
          <Search />

          <Categories />
        </Route>
        <Route>
          {/* <Navigation isLoaded={loaded} /> */}
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
