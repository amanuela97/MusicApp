import React from 'react';
import {MediaProvider} from './contexts/MediaContext.js';
import Navigator from './navigators/Navigator.js'

const App = () => {
  return (
      <MediaProvider>
         <Navigator/>
      </MediaProvider>
  );
};


export default App;