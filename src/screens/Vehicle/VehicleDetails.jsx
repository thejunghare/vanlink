import React from 'react';
import {View, Text} from 'react-native';

const VehicleDetails = () => {
    return (
        <View className={'flex-1 p-3'}>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle Number</Text>
                <Text className={'text-base font-semibold'}>MH 43 AS 1514</Text>
            </View>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Model Name</Text>
                <Text className={'text-base font-semibold'}>Maruti</Text>
            </View>
        </View>
    )
}

export default VehicleDetails;