import React from 'react';
import {View} from 'react-native';
import {Text, Button, DataTable, IconButton, Searchbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const StudentList = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const [items] = React.useState([
        {
            key: 1,
            name: 'Dhiraj Pawar',
        },
        {
            key: 2,
            name: 'shradha Maam',
        },
        {
            key: 3,
            name: 'Paddy 😄',
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <View className={'flex-1'}>
            <View className={'m-3'}>
                <Searchbar
                    placeholder="Search Student"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Student Name</DataTable.Title>
                    <DataTable.Title numeric>Actions</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>
                            <IconButton icon="eye"
                                        onPress={() => navigation.navigate('Student Details', item.key)}/>
                            <IconButton
                                icon="pencil"
                                onPress={() => navigation.navigate('Add Vehicle', {itemKey: item.key})}
                            />
                            <IconButton icon="delete" onPress={() => console.log('Delete', item.key)}/>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
            <View className='m-5 flex items-center justify-center'>
                <Text variant='titleMedium' className='py-3'>No data exist click to add!</Text>
                <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Student')}>Add
                    Student</Button>
            </View>
        </View>
    );
};

export default StudentList;
