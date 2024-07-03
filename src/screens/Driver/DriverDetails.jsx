import React from 'react';
import { View, Text } from 'react-native';

const DriverDetails = ({ route }) => {
    const { driver } = route.params;
    
    return (
        <View className={'flex-1 p-3'}>
            {/* driver name */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Driver Name</Text>
                <Text className={'text-base font-normal'}>{driver.fullname ? driver.fullname : '-'}</Text>
            </View>

            {/* driver van number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Van Number</Text>
                <Text className={'text-base font-normal'}>{driver.vehicle_number ? driver.vehicle_number : '-'}</Text>
            </View>

            {/* driver mobile number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Mobile Number</Text>
                <Text className={'text-base font-normal'}>{driver.mobile_number ? driver.mobile_number : '-'}</Text>
            </View>

            {/* accout no/upi id */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Account No/UPI id</Text>
                <Text className={'text-base font-normal'}>{driver.account_number ? driver.account_number : '-'}</Text>
            </View>

            {/* license number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Licencse Number</Text>
                <Text className={'text-base font-normal'}>{driver.licencse_number ? driver.licencse_number : '-'}</Text>
            </View>

            {/* address */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Address</Text>
                <Text className={'text-base font-normal'}>{driver.address ? driver.address : '-'}</Text>
            </View>

            {/* aadhar number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Aadhar Number</Text>
                <Text className={'text-base font-normal'}>{driver.aadhar_number ? driver.aadhar_number : '-'}</Text>
            </View>
        </View>
    )
}

export default DriverDetails;