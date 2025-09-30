import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>STOP!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>One Controller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Individual Handler</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
