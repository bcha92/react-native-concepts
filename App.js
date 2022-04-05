import React from 'react';
import { View } from 'react-native';

// src modules
import Ball from './src/Ball';

const App = () => {
  return (
    <View style={styles.container}>
      <Ball />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default App;