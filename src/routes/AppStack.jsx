import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import VehicleList from '../screens/Vehicle/VehicleList'
import AddVehicle from '../screens/Vehicle/AddVehicle'
import VehicleDetails from '../screens/Vehicle/VehicleDetails'

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerNavigator} options={{headerShown: false}}/>
      <Stack.Screen name="Vehicle List" component={VehicleList} />
      <Stack.Screen name="Add Vehicle" component={AddVehicle} />
      <Stack.Screen name="Vehicle Details" component={VehicleDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;
