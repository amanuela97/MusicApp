import React from 'react';
import List from './Components/List.js';
import {View} from "react-native";
import {MediaProvider} from './contexts/MediaContext.js';

const App = () => {
  return (
      <MediaProvider>
          <View style={{marginTop: 15}}>
              <List />
          </View>
      </MediaProvider>
  );
};


export default App;