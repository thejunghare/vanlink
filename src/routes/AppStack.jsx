// src/navigation/AppStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default AppStack;
