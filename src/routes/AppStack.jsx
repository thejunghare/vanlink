import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import VehicleDetails from '../screens/VehicleDetails'

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="Vehicle Details" component={VehicleDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;
