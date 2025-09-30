import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const OneController = () => {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState<string[]>([]);
    const navigation = useNavigation<any>();

    const addPlayer = () => {
        if (name.trim()) {
            setPlayers([...players, name.trim()]);
            setName('');
        }
    };

    const sendPlayers = () => {
        navigation.navigate('PlayersScreen', { players });
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.playerItem}>
            <Text style={styles.playerText}>{item}</Text>
        </View>
    );

    return (
        <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter player name"
                    placeholderTextColor="#666"
                    onSubmitEditing={addPlayer}
                />
                <TouchableOpacity style={styles.tickButton} onPress={addPlayer}>
                    <Text style={styles.tickText}>&#10003;</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                style={styles.playerList}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendPlayers}>
                <Text style={styles.sendText}>Send Players</Text>
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    playerText: {
        fontSize: 16,
        color: '#fff',
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
