import React from 'react';
import {View, Text} from 'react-native';

const SchoolDetails = () => {
    return (
        <View className={'flex-1 p-3'}>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>School ID</Text>
                <Text className={'text-base font-semibold'}>1232</Text>
            </View>
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>School Name</Text>
                <Text className={'text-base font-semibold'}>St. Marys</Text>
            </View>
        </View>
    )
}

export default SchoolDetails;