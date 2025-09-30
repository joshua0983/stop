import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native';

interface Player {
  name: string;
  points: number;
}

const getLowestScorePlayers = (players: Player[]) => {
  const minScore = Math.min(...players.map(p => p.points));
  return players.filter(p => p.points === minScore);
};

const OneControllerPlayers = () => {
  const { players } = useLocalSearchParams();
  const initialPlayers: string[] = players ? JSON.parse(players as string) : [];
  const [playerList, setPlayerList] = useState<Player[]>(
    initialPlayers.map(name => ({ name, points: 0 }))
  );
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number | null>(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [assignedPoints, setAssignedPoints] = useState<{ [key: string]: number }>({});
  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [winners, setWinners] = useState<Player[]>([]);

  // Handle player action selection
  const handleAction = (index: number, action: string) => {
    setSelectedPlayerIndex(index);
    if (action === 'left') {
      // Remove player from game
      setPlayerList(prev => prev.filter((_, i) => i !== index));
      setSelectedPlayerIndex(null);
    } else {
      // Open modal to choose points for all players
      setActionModalVisible(false);
      setAssignModalVisible(true);

      // Initialize assigned points (default to 0 for everyone)
      let defaultPoints: { [key: string]: number } = {};
      playerList.forEach(player => {
        defaultPoints[player.name] = 0;
      });
      // Adjust points for chosen action
      const chosenName = playerList[index].name;
      if (action === 'won-stop') defaultPoints[chosenName] = -10;
      if (action === 'won') defaultPoints[chosenName] = 0;
      if (action === 'lost') defaultPoints[chosenName] = 20;
      setAssignedPoints(defaultPoints);
    }
  };

  // Confirm new points for all players
  const handleAssignPoints = () => {
    const newList = playerList.map(player => ({
      ...player,
      points: player.points + (assignedPoints[player.name] || 0),
    }));

    setPlayerList(newList);
    setAssignModalVisible(false);

    // Check for winner
    const over50 = newList.filter((p) => p.points > 50);
    if (over50.length) {
      const winners = getLowestScorePlayers(newList);
      setWinners(winners);
      setWinnerModalVisible(true);
    }
  };

  // Handle remove from modal
  const handleLeftGameFromModal = (name: string) => {
    setPlayerList(prev => prev.filter(player => player.name !== name));
    const ap = {...assignedPoints};
    delete ap[name];
    setAssignedPoints(ap);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>
      {playerList.map((player, index) => (
        <View key={player.name} style={styles.playerRow}>
          <Text style={styles.playerText}>
            {player.name}: {player.points} points
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => { setSelectedPlayerIndex(index); setActionModalVisible(true); }}>
            <Text style={{color: '#fff'}}>Actions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.leftButton}
            onPress={() => handleAction(index, 'left')}>
            <Text style={{color: '#fff'}}>Left Game</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Action modal for selected player */}
      <Modal visible={actionModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Choose outcome for {selectedPlayerIndex !== null
                ? playerList[selectedPlayerIndex]?.name
                : ""}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleAction(selectedPlayerIndex!, 'won-stop')}>
              <Text style={styles.modalButtonText}>Won with stop! (-10)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleAction(selectedPlayerIndex!, 'won')}>
              <Text style={styles.modalButtonText}>Won (+0)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleAction(selectedPlayerIndex!, 'lost')}>
              <Text style={styles.modalButtonText}>Lost (+20)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonDanger} onPress={() => handleAction(selectedPlayerIndex!, 'left')}>
              <Text style={styles.modalButtonText}>Left Game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setActionModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Assign points modal */}
      <Modal visible={assignModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign extra points to all players</Text>
            {playerList.map((player) => (
              <View key={player.name} style={styles.assignRow}>
                <Text style={{color:'#fff'}}>{player.name}: </Text>
                <TextInput
                  style={styles.assignInput}
                  keyboardType="numeric"
                  value={assignedPoints[player.name]?.toString() ?? "0"}
                  onChangeText={text => {
                    let val = parseInt(text) || 0;
                    setAssignedPoints(prev => ({
                      ...prev,
                      [player.name]: val,
                    }));
                  }}
                />
                <TouchableOpacity style={styles.leftButtonSmall}
                  onPress={() => handleLeftGameFromModal(player.name)}>
                  <Text style={{color:'#fff'}}>Left Game</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.modalButton} onPress={handleAssignPoints}>
              <Text style={styles.modalButtonText}>Save Scores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setAssignModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      {/* Winner modal */}
      <Modal visible={winnerModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Winner(s)!</Text>
            {winners.map((w) => (
              <Text style={styles.winnerName} key={w.name}>{w.name} ({w.points})</Text>
            ))}
            <TouchableOpacity style={styles.modalButton} onPress={() => setWinnerModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#141e30',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00e0ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#243b55',
    borderRadius: 4,
    padding: 8,
  },
  playerText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  leftButton: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  leftButtonSmall: {
    backgroundColor: '#e53e3e',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#243b55',
    borderRadius: 8,
    padding: 18,
    minWidth: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#00e0ff',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
  modalButtonDanger: {
    backgroundColor: '#e53e3e',
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  assignInput: {
    minWidth: 46,
    height: 30,
    color: '#fff',
    backgroundColor: '#344e7b',
    borderRadius: 4,
    marginHorizontal: 6,
    textAlign: 'center',
    fontSize: 16,
  },
  assignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#2b3652',
    borderRadius: 4,
    padding: 5,
  },
  winnerName: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OneControllerPlayers;
