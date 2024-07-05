import React from 'react';
import { View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../lib/supabase';

const AddVehicleMaintenanceRecord = () => {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [maintenanceDescription, setMaintenanceDescription] = React.useState('');
    const [maintenanceCost, setMaintenanceCost] = React.useState('');

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
        const { error } = await supabase
            .from('vehicle_maintenance_record')
            .insert([
                {
                    maintenance_date: selectedDate,
                    maintenance_description: maintenanceDescription,
                    maintenance_cost: maintenanceCost,
                    driver_id: 1,//TODO: replace with actually ID
                    vehicle_id: 1 //TODO: replace with actually ID
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
        <View className={'px-3 flex-1'}>
            <View className={''}>
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

            {/* submit details */}
            <Button icon='plus' mode='contained' onPress={insertMaintenanceRecord}>
                Add
            </Button>
        </View>
    );
};

export default AddVehicleMaintenanceRecord;