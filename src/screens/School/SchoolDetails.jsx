import React from 'react';
import { View, Text } from 'react-native';

const SchoolDetails = ({ route }) => {
    const { school } = route.params;

    return (
        <View className={'flex-1 p-3'}>
            {/* school name */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Name</Text>
                <Text className={'text-base font-normal'}>{school.school_name}</Text>
            </View>
            {/* school address */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Address</Text>
                <Text className={'text-base font-normal'}>{school.school_address}</Text>
            </View>
            {/* school shift */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Shift</Text>
                <Text className={'text-base font-normal'}>{school.school_shift}</Text>
            </View>
        </View>
    )
}

export default SchoolDetails;