import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Sightings from './components/sightings/Sightings';
import SingleSighting from './components/SingleSighting/SingleSighting';
import CreateSightingForm from './components/CreateSightingForm/CreateSightingForm'
import ImageForm from './components/ImageForm/ImageForm';
import EditForm from './components/EditForm/EditForm';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import CreateNav from './components/CreateSightingForm/CreateNav';
import Categories from './components/Categories/Categories';
import Category from './components/Categories/Category';
import MySightings from './components/MySightings/mysightings';
import NotFound from './components/NotFound/NotFound';
import Search from './components/Search/Search';
import Favorites from './components/Favorites/Favorites';
// MAIN
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
        <Route path='/' >
          {/* <Navigation isLoaded={loaded} /> */}
          <Main />
          {/* <Sightings /> */}
          {/* <Categories /> */}
        </Route>
        <ProtectedRoute path='/mysightings' exact={true} >
          <Navigation isLoaded={loaded} />
          <MySightings />
          {/* <Categories /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/myfavorites' exact={true} >
          <Navigation isLoaded={loaded} />
          <Favorites />
          {/* <Categories /> */}
        </ProtectedRoute>
        <Route path='/sightings/categories/:category' exact={true} >
          <Navigation isLoaded={loaded} />
          {/* <Categories /> */}
          <Category />
        </Route>
        <Route path='/sightings/:sightingId' exact={true} >
          <Navigation isLoaded={loaded} />
          <SingleSighting />
          {/* <Categories /> */}
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
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
