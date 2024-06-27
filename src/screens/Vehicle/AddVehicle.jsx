import React from 'react';
import {View} from 'react-native';
import {Text, Button, DataTable, IconButton, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const AddVehicle = () => {
    return (
        <View className={'px-3 flex-1'}>
            <View className={''}>
                <TextInput
                    label="Vechile Number"
                    placeholder='MH 43 AS 1514'
                    className={'my-3'}
                />

                <TextInput
                    label="Model Name"
                    placeholder='Honda CB Shine'
                    className={'my-3'}
                />
            </View>

            <Button icon="plus" mode="contained">
                Add
            </Button>
        </View>
    )
}

export default AddVehicle;