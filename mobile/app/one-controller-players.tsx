import React, { FC } from 'react';
import { View, Text } from 'react-native';

interface OneControllerPlayersProps {
  players: string[];
}

interface Player {
  name: string;
  points: number;
}

const OneControllerPlayers: FC<OneControllerPlayersProps> = ({ players }) => {
  const playersWithPoints: Player[] = players.map((name: string) => ({
    name,
    points: 0,
  }));

  return (
    <View style={{ padding: 16 }}>
      {playersWithPoints.map((player, index) => (
        <Text key={index} style={{ fontSize: 16, marginVertical: 4 }}>
          {player.name}: {player.points} points
        </Text>
      ))}
    </View>
  );
};

export default OneControllerPlayers;