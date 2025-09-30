import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>STOP!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push({ pathname: '/one-controller' })}
        >
          <Text style={styles.buttonText}>One Controller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Individual Handler</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 80, // Increased font size for a bigger stop sign
    fontWeight: 'bold',
    color: '#00e0ff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00e0ff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#141e30',
    fontSize: 18,
    fontWeight: '600',
  },
});
