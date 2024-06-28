import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

import VehicleList from '../screens/Vehicle/VehicleList';
import AddVehicle from '../screens/Vehicle/AddVehicle';
import VehicleDetails from '../screens/Vehicle/VehicleDetails';

import DriverList from '../screens/Driver/DriverList';
import AddDriver from '../screens/Driver/AddDriver';
import DriverDetails from '../screens/Driver/DriverDetails';

import SchoolList from '../screens/School/SchoolList';
import AddSchool from '../screens/School/AddSchool';
import SchoolDetails from '../screens/School/SchoolDetails';

import StudentList from '../screens/Student/StudentList';
import AddStudent from '../screens/Student/AddStudent';
import StudentDetails from '../screens/Student/StudentDetails';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Vehicle List" component={VehicleList}/>
            <Stack.Screen name="Add Vehicle" component={AddVehicle}/>
            <Stack.Screen name="Vehicle Details" component={VehicleDetails}/>

            <Stack.Screen name="Driver List" component={DriverList}/>
            <Stack.Screen name="Add Driver" component={AddDriver}/>
            <Stack.Screen name="Driver Details" component={DriverDetails}/>

            <Stack.Screen name="Student List" component={StudentList}/>
            <Stack.Screen name="Add Student" component={AddStudent}/>
            <Stack.Screen name="Student Details" component={StudentDetails}/>
        </Stack.Navigator>
    );
};

export default AppStack;
