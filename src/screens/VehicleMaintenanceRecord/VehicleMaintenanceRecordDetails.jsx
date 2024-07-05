import React from 'react';
import { View, Text } from 'react-native';

const VehicleMaintenanceRecordDetails = ({ route }) => {
    const { vehiclesRecord } = route.params;

    return (
        <View className={'flex-1 p-3'}>
            {/* vehicle number */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Vehicle Number</Text>
                <Text className={'text-base font-normal'}>{vehiclesRecord.vehicle_id ? vehiclesRecord.vehicle_id : '-'}</Text>
            </View>

            {/* maintenance date */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Date</Text>
                <Text className={'text-base font-normal'}>{vehiclesRecord.maintenance_date ? vehiclesRecord.maintenance_date : '-'}</Text>
            </View>

            {/* maintenance description */}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Description</Text>
                <Text className={'text-base font-normal'}>{vehiclesRecord.maintenance_description ? vehiclesRecord.maintenance_description : '-'}</Text>
            </View>

            {/* maintenacnce cost*/}
            <View className={'my-2 flex flex-row items-center justify-between'}>
                <Text className={'text-base font-semibold'}>Cost</Text>
                <Text className={'text-base font-normal'}>{vehiclesRecord.maintenance_cost ? vehiclesRecord.maintenance_cost : '-'}</Text>
            </View>
        </View>
    );
};

export default VehicleMaintenanceRecordDetails;