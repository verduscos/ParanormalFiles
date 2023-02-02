import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import CreateSightingForm from "./components/CreateSightingForm/CreateSightingForm"
import EditForm from "./components/EditForm/EditForm";
import { authenticate } from "./store/session";
import NotFound from "./components/NotFound/";
import Main from "./components/Main";

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
    <HashRouter>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="bookmarks" element={<Main />} />
          <Route path="/sightings/:sightingId" element={<Main />} />
          <Route path="/mysightings" element={<Main />} />
          <Route path="/report" element={<CreateSightingForm />} />
          <Route path="/sightings/edit/:sightingId" element={<EditForm />} />
          <Route path="/sightings/search/:string" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default App;
