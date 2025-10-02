import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock of network-discovered parties
const MOCK_PARTIES = [
  { id: '123', hostName: 'Alice' },
  { id: '456', hostName: 'Bob' },
];

const Player = () => {
  const [name, setName] = useState('');
  const [parties, setParties] = useState(MOCK_PARTIES);
  const [joining, setJoining] = useState(false);

  // Placeholder for discovering parties on the network
  // e.g., useEffect(...) to poll/discover via local backend

  const handleJoin = (partyId: string, hostName: string) => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter your name before joining a party.');
      return;
    }
    setJoining(true);
    // TODO: Actual join network logic here
    setTimeout(() => {
      setJoining(false);
      Alert.alert('Joined!', `Joined party hosted by ${hostName} as ${name}`);
      // TODO: Navigate to the actual game/session, passing name/party info
    }, 800);
  };

  return (
    <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Join a Party</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Name:</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          autoCorrect={false}
          editable={!joining}
        />
      </View>
      <Text style={styles.availableText}>Nearby Parties:</Text>
      <FlatList
        data={parties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.partyButton}
            onPress={() => handleJoin(item.id, item.hostName)}
            disabled={joining}
          >
            <Text style={styles.partyText}>
              Host: <Text style={styles.hostName}>{item.hostName}</Text>
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noPartyText}>No parties found</Text>}
        style={{ marginTop: 12 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 35,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00e0ff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  inputContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
    color: '#333',
    fontSize: 16,
    width: 220,
  },
  availableText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 3,
  },
  partyButton: {
    backgroundColor: '#007AFF',
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 15,
    alignItems: 'center',
  },
  partyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  hostName: {
    color: '#00e0ff',
  },
  noPartyText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
  }
});

export default Player;
