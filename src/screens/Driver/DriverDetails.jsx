import React from 'react';
import {View, Text} from 'react-native';

const DriverDetails = () => {
    return (
        <View className={'flex-1 p-3'}>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Driver ID</Text>
                <Text className={'text-base font-semibold'}>1232</Text>
            </View>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Driver Name</Text>
                <Text className={'text-base font-semibold'}>John Cena</Text>
            </View>
        </View>
    )
}

export default DriverDetails;