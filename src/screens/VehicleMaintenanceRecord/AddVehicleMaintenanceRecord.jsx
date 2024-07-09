import React from 'react';
import {View, Text, ToastAndroid, ScrollView, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';
import {supabase} from '../../lib/supabase';

const AddVehicleMaintenanceRecord = ({route}) => {
    const {userId, roleId, ownerId, driverId} = route.params;
    console.log(userId, roleId, ownerId, driverId);
    
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [maintenanceDescription, setMaintenanceDescription] = React.useState('');
    const [maintenanceCost, setMaintenanceCost] = React.useState('');
    // for vehicle picker
    const [vehicleDetails, setVehicleDetails] = React.useState([]);
    const [selectedVehicle, setSelectedVehicle] = React.useState([]);

    const fetchVehicles = async () => {
        let {data: vehicles, error} = await supabase
            .from('vehicles')
            .select('*')
            .eq('owner_id', ownerId);

        if (vehicles) {
            console.info('vehicles fetched!');

            const mappedVehicles = vehicles.map(vehicle => ({
                label: vehicle.vehicle_number,
                value: vehicle.id,
            }));

            setVehicleDetails(mappedVehicles);
        } else {
            console.error('Failed to fetch vehilces!', error);
        }
    }

    React.useEffect(() => {
        fetchVehicles();
    }, [])

    const resetFields = () => {
        setMaintenanceCost('');
        setMaintenanceDescription('');
    }

    const handleDateChange = (event, newDate) => {
        const currentDate = newDate || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const insertMaintenanceRecord = async () => {
        const {error} = await supabase
            .from('vehicle_maintenance_record')
            .insert([
                {
                    maintenance_date: selectedDate,
                    maintenance_description: maintenanceDescription,
                    maintenance_cost: maintenanceCost,
                    vehicle_id: selectedVehicle,
                    owner_id: ownerId,
                    driver_id: driverId,
                }
            ]);

        if (!error) {
            console.info('Record added');
            resetFields();
            ToastAndroid.show('Added !', ToastAndroid.SHORT);
        } else {
            console.error('record failed', error);
            ToastAndroid.show('Failed !', ToastAndroid.SHORT);
        }
    }

    return (
        <ScrollView className={'px-3 flex-1'}>
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    {/* date */}
                    <TextInput
                        onPress={openDatePicker}
                        placeholder="Select Date"
                        value={selectedDate.toLocaleDateString()}
                        className={'my-3'}
                        mode='outlined'
                    />
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={selectedDate}
                            mode="date"
                            is24Hour={false} // Adjust based on preference
                            display="calendar"
                            onChange={handleDateChange}
                        />
                    )}

                    <View className='bg-white mt-3'>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={vehicleDetails}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select vehicle'}
                            searchPlaceholder="Search vehicle"
                            value={selectedVehicle}
                            onChange={item => {
                                setSelectedVehicle(item.value);
                            }}
                        />
                    </View>

                    {/* description */}
                    <TextInput
                        label='Maintenance Description*'
                        placeholder='Enter maintenance description'
                        className={'my-3'}
                        mode='outlined'
                        onChangeText={setMaintenanceDescription}
                        value={maintenanceDescription}
                    />

                    {/* cost */}
                    <TextInput
                        label='Maintenance Cost*'
                        placeholder='Enter maintenance cost'
                        className={'my-3'}
                        mode='outlined'
                        onChangeText={setMaintenanceCost}
                        value={maintenanceCost}
                    />
                </View>

                <View className='h-1/5 m-5 flex items-center justify-center'>
                    {/* submit details */}
                    <Button icon='plus' mode='contained' onPress={insertMaintenanceRecord}>
                        Add Record
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default AddVehicleMaintenanceRecord;