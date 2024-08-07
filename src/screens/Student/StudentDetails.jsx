import React from 'react';
import { View, Text } from 'react-native';

const StudentDetails = ({ route }) => {
    const { student } = route.params;

    return (
        <View className={'flex-1 p-3'}>
            {/* student id */}
            {/* <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Student ID</Text>
                <Text className={'text-base font-normal'}>{student.id ? student.id : '-'}</Text>
            </View> */}

            {/* student name */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Student Name</Text>
                <Text className={'text-base font-normal'}>{student.full_name ? student.full_name : '-'}</Text>
            </View>

            {/* student upi number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>UPI</Text>
                <Text className={'text-base font-normal'}>{student.upi_number ? student.upi_number : '-'}</Text>
            </View>

            {/* student std  */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Standard</Text>
                <Text className={'text-base font-normal'}>{student.student_std ? student.student_std : '-'}</Text>
            </View>

            {/* student division */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Division</Text>
                <Text className={'text-base font-normal'}>{student.student_division ? student.student_division : '-'}</Text>
            </View>

            {/* student addressx*/}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Address</Text>
                <Text className={'text-base font-normal'}>{student.address ? student.address : '-'}</Text>
            </View>

            {/* student mobile number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Mobile Number</Text>
                <Text className={'text-base font-normal'}>{student.mobile_number ? student.mobile_number : '-'}</Text>
            </View>

            {/* student fees */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Fees</Text>
                <Text className={'text-base font-normal'}>{student.student_fees ? student.student_fees : '-'}</Text>
            </View>

            {/* student school id*/}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>School ID</Text>
                <Text className={'text-base font-normal'}>{student.school_id ? student.school_id : '-'}</Text>
            </View>

            {/* student van id*/}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Van ID</Text>
                <Text className={'text-base font-normal'}>{student.van_id ? student.van_id : '-'}</Text>
            </View>
        </View>
    )
}

export default StudentDetails;