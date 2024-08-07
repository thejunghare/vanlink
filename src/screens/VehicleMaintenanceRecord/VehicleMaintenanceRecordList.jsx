import React from 'react';
import { View, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import { Text, Button, DataTable, IconButton, Searchbar, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const VehicleMaintenanceRecordList = ({ route }) => {
    const { userId, roleId, ownerId, driverId } = route.params;
    // console.log(userId, roleId, ownerId);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [vehiclesRecords, setVehicleRecords] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState();

    const fetchVehicleMaintenancetRecord = async () => {
        try {
            // Step 1: Fetch vehicle maintenance records
            let { data: vehicleMaintenanceRecords, error } = await supabase
                .from('vehicle_maintenance_record')
                .select('*')
                .eq('owner_id', ownerId);

            if (error) throw error;

            // Step 2: Fetch vehicle numbers for the fetched vehicle IDs
            const vehicleIds = vehicleMaintenanceRecords.map(record => record.vehicle_id);
            let { data: vehicles, vehicleError } = await supabase
                .from('vehicles')
                .select('id, vehicle_number')
                .in('id', vehicleIds);

            if (vehicleError) throw vehicleError;

            // Step 3: Combine results
            const combinedRecords = vehicleMaintenanceRecords.map(record => {
                const vehicle = vehicles.find(v => v.id === record.vehicle_id);
                return {
                    ...record,
                    vehicle_number: vehicle ? vehicle.vehicle_number : null,
                };
            });

            console.info('Records fetched!', combinedRecords);
            setVehicleRecords(combinedRecords);
            ToastAndroid.show('Records fetched!', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Failed to fetch records!', error);
            ToastAndroid.show('Failed to fetch records!', ToastAndroid.SHORT);
        }
    };


    const deleteVehicle = async (id) => {
        const { error } = await supabase
            .from('vehicle_maintenance_record')
            .delete()
            .eq('id', id);

        if (!error) {
            console.info('Record deleted !');
            fetchVehicleMaintenancetRecord();
            ToastAndroid.show('Record deleted !', ToastAndroid.SHORT);
        } else {
            console.info('Failed to delete record !', error);
            ToastAndroid.show('Failed to delete record !', ToastAndroid.SHORT);
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchVehicleMaintenancetRecord().finally(() => setRefreshing(false));
        }, 2000);
    })

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, vehiclesRecords.length);

    React.useEffect(() => {
        fetchVehicleMaintenancetRecord();
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView
            className={'flex-1'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    <View className={'m-3'}>
                        <Searchbar
                            placeholder='Search Record'
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                    </View>

                    <DataTable>
                        {vehiclesRecords.slice(from, to).map((vehiclesRecord) => (
                            <DataTable.Row key={vehiclesRecord.id}>
                                <DataTable.Cell>{vehiclesRecord.vehicle_number}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <IconButton
                                        icon='eye'
                                        onPress={() =>
                                            navigation.navigate('Vehicel Maintenance Record Details', { vehiclesRecord })
                                        }
                                    />

                                    <IconButton
                                        icon='pencil'
                                        onPress={() =>
                                            navigation.navigate('Add Vehicle', { itemId: vehiclesRecord.id })
                                        }
                                    />

                                    <IconButton
                                        icon='delete'
                                        onPress={() => deleteVehicle(vehiclesRecord.id)}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(vehiclesRecords.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${vehiclesRecords.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>
                </View>

                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button
                        icon='plus'
                        mode='contained'
                        onPress={() => navigation.navigate('Add Vehicel Maintenance Record', {
                            userId: userId,
                            roleId: roleId,
                            ownerId: ownerId,
                            driverId: driverId
                        })}
                    >
                        Add Record
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default VehicleMaintenanceRecordList;