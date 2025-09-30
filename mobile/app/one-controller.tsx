import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

function uniqueId() {
    return Math.random().toString(36).substr(2, 9) + Date.now();
}

interface Player {
    id: string;
    name: string;
}

const OneController = () => {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);
    const router = useRouter();
    const inputRef = useRef<TextInput>(null);

    const addPlayer = () => {
        if (name.trim()) {
            setPlayers([...players, { id: uniqueId(), name: name.trim() }]);
            setName('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    const removePlayer = (id: string) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const sendPlayers = () => {
        // Pass only names, as per previous code
        router.push({
            pathname: '/one-controller-players',
            params: { players: JSON.stringify(players.map(p => p.name)) }
        });
    };

    const renderItem = ({ item }: { item: Player }) => (
        <View style={styles.playerItem}>
            <Text style={styles.playerText}>{item.name}</Text>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePlayer(item.id)}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>×</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter player name"
                    placeholderTextColor="#660"
                    onSubmitEditing={addPlayer}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.tickButton} onPress={addPlayer}>
                    <Text style={styles.tickText}>&#10003;</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.playerList}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendPlayers}>
                <Text style={styles.sendText}>Start</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#dedede',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        color: '#333',
    },
    tickButton: {
        marginLeft: 8,
        padding: 8,
        backgroundColor: '#007AFF',
        borderRadius: 4,
    },
    tickText: {
        fontSize: 18,
        color: '#fff',
    },
    playerList: {
        flex: 1,
    },
    playerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerText: {
        fontSize: 16,
        color: '#fff',
        flex: 1,
    },
    removeButton: {
        backgroundColor: '#e53e3e',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#28a745',
        borderRadius: 4,
        alignItems: 'center',
    },
    sendText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default OneController;
