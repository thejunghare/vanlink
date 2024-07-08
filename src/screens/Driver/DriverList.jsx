import React from 'react';
import { View, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import { Text, Button, DataTable, IconButton, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const DriverList = ({ route }) => {
    const { userId, roleId, ownerId } = route.params;
    console.info('Route params data on driver list screen: ', userId, roleId, ownerId);

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [drivers, setDrivers] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState();

    const fetchDrivers = async () => {
        const { data: { user }, } = await supabase.auth.getUser();
        console.info('loggedInUserId', user.id);

        const { data: drivers, error: error } = await supabase
            .from('drivers')
            .select('*')
            .eq('employer_id', ownerId); // employer ID(owner Id)

        if (error) {
            console.error("Error fetching drivers:", error);
            ToastAndroid.show('error fetching drivers!', ToastAndroid.SHORT);
            return;
        }

        if (drivers) {
            setDrivers(drivers);
            ToastAndroid.show('Drivers fetched!', ToastAndroid.SHORT);
            drivers.forEach((driver) => console.log(driver.profile_id));
            drivers.forEach((driver) => console.log(driver.id));
        }
    };

    React.useEffect(() => {
        fetchDrivers();
    }, []);

    const deleteDrivers = async (id) => {
        const { error } = await supabase
            .from('drivers')
            .delete()
            .eq('id', id);

        if (!error) {
            console.info('Driver Removed!');
            fetchDrivers();
            ToastAndroid.show('Driver Removed!', ToastAndroid.SHORT);
        } else {
            console.error('Unable to remove driver!', error);
            ToastAndroid.show('error removing driver!', ToastAndroid.SHORT);
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchDrivers().finally(() => setRefreshing(false));
        }, 2000);
    });

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, drivers.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <ScrollView
            ScrollView
            className={'flex-1'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    <View className={'m-3'}>
                        <Searchbar
                            placeholder='Search Driver'
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Driver Id</DataTable.Title>
                            <DataTable.Title numeric>Actions</DataTable.Title>
                        </DataTable.Header>

                        {drivers.slice(from, to).map((driver) => (
                            <DataTable.Row key={driver.id}>
                                <DataTable.Cell>{driver.profile_id}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <IconButton
                                        icon='eye'
                                        onPress={() =>
                                            navigation.navigate('Driver Details', { driver })
                                        }
                                    />

                                    <IconButton
                                        icon='pencil'
                                        onPress={() =>
                                            navigation.navigate('Add Driver', { itemId: driver.id })
                                        }
                                    />

                                    <IconButton
                                        icon='delete'
                                        onPress={() => deleteDrivers(driver.id)}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(drivers.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${drivers.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>
                </View>

                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Driver', { userId: userId, roleId: roleId, ownerId: ownerId })}>Add
                        Driver</Button>
                </View>
            </View>
        </ScrollView>
    );
};

export default DriverList;
