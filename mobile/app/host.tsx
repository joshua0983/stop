import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function uniqueId() {
    return Math.random().toString(36).substr(2, 9) + Date.now();
}

interface PartyMember {
    id: string;
    name: string;
    role: 'host' | 'player';
}

const Host = () => {
    const [hostName, setHostName] = useState('');
    const [party, setParty] = useState<PartyMember[]>([]);
    const [partyActive, setPartyActive] = useState(false);

    // "Create Party": Registers host
    const createParty = () => {
        if (!hostName.trim()) {
            Alert.alert('Name required', 'Enter your name to create a party.');
            return;
        }
        setParty([
            { id: uniqueId(), name: hostName.trim(), role: 'host' }
        ]);
        setPartyActive(true);
        // TODO: Kick off server (WebSocket, REST, etc.) here
    };

    // Mock: Function to simulate player join for testing
    const simulateJoin = () => {
        setParty((prev) => [
            ...prev,
            { id: uniqueId(), name: `Player${prev.length}`, role: 'player' }
        ]);
    };

    return (
        <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Host A Party</Text>
            </View>
            {!partyActive ? (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter your name as Host:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={hostName}
                        onChangeText={setHostName}
                        placeholder="Host name"
                        placeholderTextColor="#666"
                        returnKeyType="done"
                        onSubmitEditing={createParty}
                    />
                    <TouchableOpacity style={styles.startButton} onPress={createParty}>
                        <Text style={styles.startText}>Create Party</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.partySection}>
                    <Text style={styles.subHeader}>Party Members:</Text>
                    <FlatList
                        data={party}
                        renderItem={({ item }) => (
                            <View style={styles.partyMember}>
                                <Text style={styles.partyMemberText}>
                                    {item.name} {item.role === 'host' && <Text style={styles.hostBadge}>(Host)</Text>}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        style={{ marginVertical: 10 }}
                    />
                    {/* For development/demo: you can remove in production */}
                    <TouchableOpacity style={styles.joinTester} onPress={simulateJoin}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Simulate Player Join (Dev)</Text>
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
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
        alignItems: 'center',
        marginTop: 40,
    },
    label: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 12,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#dedede',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 6,
        color: '#333',
        width: 220,
        fontSize: 16,
        marginBottom: 18,
    },
    startButton: {
        backgroundColor: '#00e0ff',
        paddingHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 10,
    },
    startText: {
        color: '#141e30',
        fontWeight: 'bold',
        fontSize: 18,
    },
    partySection: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    subHeader: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    partyMember: {
        padding: 10,
        backgroundColor: '#243b55',
        borderRadius: 8,
        marginVertical: 4,
        alignItems: 'center',
    },
    partyMemberText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    hostBadge: {
        color: '#28a745',
        fontWeight: 'bold',
    },
    joinTester: {
        backgroundColor: '#007AFF',
        marginTop: 18,
        borderRadius: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});

export default Host;
