import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const IndividualContributor = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Individual Handler</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonHost}
          onPress={() => router.push({ pathname: '/host' })}
        >
          <Text style={styles.buttonText}>Host</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPlayer}
          onPress={() => router.push({ pathname: '/player' })}
        >
          <Text style={styles.buttonText}>Player</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

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
    fontSize: 36,
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
  buttonHost: {
    backgroundColor: '#00e0ff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 8,
    width: 220,
    alignItems: 'center',
  },
  buttonPlayer: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 8,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#141e30',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default IndividualContributor;
