import React from 'react';
import { View, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import { Text, Button, DataTable, IconButton, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const SchoolList = ({ route }) => {
    const { userId, roleId, ownerId } = route.params;
    console.info('Route params data on school list screen: ', userId, roleId, ownerId);

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [refreshing, setRefreshing] = React.useState();
    const [schools, setSchools] = React.useState([]);

    const fetchSchools = async () => {
        let { data: schools, error } = await supabase
            .from('schools')
            .select('*')
            .eq('owner_id', ownerId);

        if (error) {
            //console.error("Error fetching schools:", error);
            ToastAndroid.show('error fetching schools!', ToastAndroid.SHORT);
        }

        if (schools) {
            //console.info('Schools fetched', schools);
            setSchools(schools);
            ToastAndroid.show('Schools fetched!', ToastAndroid.SHORT);
            //schools.forEach((school) => console.log(school.school_name));
            //schools.forEach((school) => console.log(school.id));
        }
    }

    const deleteSchool = async (id) => {
        const { error } = await supabase
            .from('schools')
            .delete()
            .eq('id', id);

        if (!error) {
            //console.info('School removed');
            ToastAndroid.show('Removed !', ToastAndroid.SHORT);
            fetchSchools();
        } else {
            //console.info('Removed failed !');
            ToastAndroid.show('Removed failed !', ToastAndroid.SHORT);
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchSchools().finally(() => setRefreshing(false));
        }, 2000);
    });

    React.useEffect(() => {
        fetchSchools();
        setPage(0);
    }, [itemsPerPage]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, schools.length);

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
                            placeholder='Search School'
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>School Name</DataTable.Title>
                            <DataTable.Title numeric>Actions</DataTable.Title>
                        </DataTable.Header>

                        {schools.slice(from, to).map((school) => (
                            <DataTable.Row key={school.id}>
                                <DataTable.Cell>{school.school_name}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <IconButton
                                        icon='eye'
                                        onPress={() =>
                                            navigation.navigate('School Details', { school })
                                        }
                                    />

                                    {(roleId === 2 || roleId === 3) && (
                                        <IconButton
                                            icon='pencil'
                                            onPress={() =>
                                                navigation.navigate('Add School', { itemId: school.id })
                                            }
                                        />
                                    )}

                                    {(roleId === 2 || roleId === 3) && (
                                        <IconButton
                                            icon='delete'
                                            onPress={() => deleteSchool(school.id)}
                                        />
                                    )}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(schools.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${schools.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>

                </View>

                {(roleId === 2 || roleId === 3) && (
                    <View className='h-1/5 m-5 flex items-center justify-center'>
                        <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add School', { userId: userId, roleId: roleId, ownerId: ownerId })}>Add
                            School</Button>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default SchoolList;
