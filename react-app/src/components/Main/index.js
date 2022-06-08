import React from 'react';
import Tags from '../Tags';
import './Main.css';

const Main = () => {


  return (
    <div id="content-grid">
      <div id="col-1">
        ONE
      </div>
      <div id="col-2">
        TWO
      </div>
      <div id="col-3">
        <Tags />
      </div>
    </div>
  )
}

export default Main;
