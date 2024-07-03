import React from 'react';
import { View, Text } from 'react-native';

const VehicleDetails = ({ route }) => {
    const { vehicle } = route.params;

    return (
        <View className={'flex-1 p-3 '}>
            {/* vehicle number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle Number</Text>
                <Text className={'text-base font-normal'}>{vehicle.vehicle_number}</Text>
            </View>

            {/* vehicle capacity */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle Capacity</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_capacity}</Text>
            </View>

            {/* vehicle Model */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Model Name</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_modal}</Text>
            </View>

            {/* vehicle Manufacturer */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle Manufacturer</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_manufacturer ? vehicle.vehicle_manufacturer : '-'}</Text>
            </View>

            {/* vehicle Year of Mfg */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Year of Mfg</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_yearOfMfg ? vehicle.vehicle_yearOfMfg : '-'}</Text>
            </View>

            {/* vehicle Maintenance Schedule */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Insurance Details</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_maintenance_schedule ? vehicle.vehicle_maintenance_schedule : '-'}</Text>
            </View>

            {/* vehicle Insurance Details */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Insurance Details</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_insurance ? vehicle.vehicle_insurance : '-'}</Text>
            </View>

            {/* vehicle RC Number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle RC Number</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_rc_number ? vehicle.vehicle_rc_number : '-'}</Text>
            </View>

            {/* vehicle Fitness Certificate */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle RC Number</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_fitness_certificate ? vehicle.vehicle_fitness_certificate : '-'}</Text>
            </View>

            {/* vehicle POC End Date */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>POC (end date)</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_poc_end_date ? vehicle.vehicle_poc_end_date : '-'}</Text>
            </View>

            {/* vehicle Green Tax End Date */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Green Tax (end date)</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_green_tax_end_date ? vehicle.vehicle_green_tax_end_date : '-'}</Text>
            </View>

            {/* vehicle Business Tax End Date */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Business Tax (end date)</Text>
                <Text className={'text-base font-noraml'}>{vehicle.vehicle_business_tax_end_date ? vehicle.vehicle_business_tax_end_date : '-'}</Text>
            </View>
        </View>
    )
}

export default VehicleDetails;