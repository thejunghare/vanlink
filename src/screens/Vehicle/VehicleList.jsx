import React from 'react';
import {View, RefreshControl, ScrollView, ToastAndroid} from 'react-native';
import {Text, Button, DataTable, IconButton, Searchbar,} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../lib/supabase';

const Vehicles = ({route}) => {
    const {userId, roleId, ownerId} = route.params;
    console.info(ownerId, roleId, userId);

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 4, 6, 8, 10]);
    const [itemsPerPage, setItemsPerPage] = React.useState(numberOfItemsPerPageList[0]);
    const [vehicles, setVehicles] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState();

    const fetchVehicles = async () => {
        const {data: vehicles, error: error} = await supabase
            .from('vehicles')
            .select('*')
            .eq('owner_id', ownerId);

        if (error) {
            console.error('Error fetching vehicles:', error);
            ToastAndroid.show('Failed to fetch vehicle!', ToastAndroid.SHORT);
            return;
        }

        if (vehicles) {
            setVehicles(vehicles);
            ToastAndroid.show('Vehicels fetched!', ToastAndroid.SHORT);
            //vehicles.forEach((vehicle) => console.log(vehicle.vehicle_number));
            //vehicles.forEach((vehicle) => console.log(vehicle.id));
        }
    };

    React.useEffect(() => {
        fetchVehicles();
    }, []);

    const deleteVehicle = async (id) => {
        const {error} = await supabase
            .from('vehicles')
            .delete()
            .eq('id', id);

        if (!error) {
            //console.info('Vehicle Deleted');
            fetchVehicles();
            ToastAndroid.show('Deleted!', ToastAndroid.SHORT);
        } else {
            //console.error('error while delete', error);
            ToastAndroid.show(`Can't delete!`, ToastAndroid.SHORT);
        }
    }

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, vehicles.length);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchVehicles().finally(() => setRefreshing(false));
        }, 2000);
    })

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView
            className={'flex-1'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    <View className={'m-3'}>
                        <Searchbar
                            placeholder='Search Vehicle'
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Vehicle Number</DataTable.Title>
                            <DataTable.Title numeric>Actions</DataTable.Title>
                        </DataTable.Header>

                        {vehicles.slice(from, to).map((vehicle) => (
                            <DataTable.Row key={vehicle.id}>
                                <DataTable.Cell>{vehicle.vehicle_number}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <IconButton
                                        icon='eye'
                                        onPress={() =>
                                            navigation.navigate('Vehicle Details', {vehicle})
                                        }
                                    />

                                    <IconButton
                                        icon='pencil'
                                        onPress={() =>
                                            navigation.navigate('Add Vehicle', {itemId: vehicle.id})
                                        }
                                    />

                                    <IconButton
                                        icon='delete'
                                        onPress={() => deleteVehicle(vehicle.id)}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(vehicles.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${vehicles.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={setItemsPerPage}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>
                </View>


                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button
                        icon='plus'
                        mode='contained'
                        onPress={() => navigation.navigate('Add Vehicle', {
                            userId: userId,
                            roleId: roleId,
                            ownerId: ownerId
                        })}
                    >
                        Add Vehicle
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default Vehicles;
