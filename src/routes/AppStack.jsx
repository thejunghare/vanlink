import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';

// vehicle's
import VehicleList from '../screens/Vehicle/VehicleList';
import AddVehicle from '../screens/Vehicle/AddVehicle';
import VehicleDetails from '../screens/Vehicle/VehicleDetails';

// driver's
import DriverList from '../screens/Driver/DriverList';
import AddDriver from '../screens/Driver/AddDriver';
import DriverDetails from '../screens/Driver/DriverDetails';

// school's
import SchoolList from '../screens/School/SchoolList';
import AddSchool from '../screens/School/AddSchool';
import SchoolDetails from '../screens/School/SchoolDetails';

// students's
import StudentList from '../screens/Student/StudentList';
import AddStudent from '../screens/Student/AddStudent';
import StudentDetails from '../screens/Student/StudentDetails';

// vehicle Maintenance record
import VehicleMaintenanceRecordList from '../screens/VehicleMaintenanceRecord/VehicleMaintenanceRecordList';
import VehicleMaintenanceRecordDetails from '../screens/VehicleMaintenanceRecord/VehicleMaintenanceRecordDetails';
import AddVehicleMaintenanceRecord from '../screens/VehicleMaintenanceRecord/AddVehicleMaintenanceRecord';

// payment's
import ListPaymentDetails from '../screens/Payment/ListPaymentDetails';
import AddPaymentDetails from '../screens/Payment/AddPaymentDetails';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={
                    {
                        headerShown: false,
                        backgroundColor: '#324AB2'
                    }
                }
            />
            <Stack.Screen
                name="Vehicle List"
                component={VehicleList}
                options={
                    {
                        backgroundColor: '#324AB2'
                    }
                }
            />
            <Stack.Screen name="Add Vehicle" component={AddVehicle}/>
            <Stack.Screen name="Vehicle Details" component={VehicleDetails}/>

            <Stack.Screen name="Driver List" component={DriverList}/>
            <Stack.Screen name="Add Driver" component={AddDriver}/>
            <Stack.Screen name="Driver Details" component={DriverDetails}/>

            <Stack.Screen name="School List" component={SchoolList}/>
            <Stack.Screen name="Add School" component={AddSchool}/>
            <Stack.Screen name="School Details" component={SchoolDetails}/>

            <Stack.Screen name="Student List" component={StudentList}/>
            <Stack.Screen name="Add Student" component={AddStudent}/>
            <Stack.Screen name="Student Details" component={StudentDetails}/>

            <Stack.Screen name="Vehicel Maintenance Record List" component={VehicleMaintenanceRecordList}/>
            <Stack.Screen name="Add Vehicel Maintenance Record" component={AddVehicleMaintenanceRecord}/>
            <Stack.Screen name="Vehicel Maintenance Record Details" component={VehicleMaintenanceRecordDetails}/>

            <Stack.Screen name="Payment Details" component={ListPaymentDetails}/>
            <Stack.Screen name="Add Payment Details" component={AddPaymentDetails}/>
        </Stack.Navigator>
    );
};

export default AppStack;
