import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
  BottomNavigation,
  Text,
} from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Index() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      secondary: 'yellow',
    },
  };

  return <Text>im here profile</Text>;
}
