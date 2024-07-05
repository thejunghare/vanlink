import React from 'react';
import { View, RefreshControl, ScrollView, ToastAndroid, StyleSheet } from 'react-native';
import { Text, Button, DataTable, IconButton, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../lib/supabase';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const ListPaymentDetails = ({ route }) => {
    const { roleId, userId } = route.params;
    const navigation = useNavigation();
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [refreshing, setRefreshing] = React.useState();
    const [schools, setSchools] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Select School
                </Text>
            );
        }
        return null;
    };

    const fetchSchools = async () => {
        let { data: schools, error } = await supabase
            .from('schools')
            .select('*')
            .eq('owner_id', 1); // Todo: replace wiht actual ID

        if (error) {
            //console.error("Error fetching schools:", error);
            ToastAndroid.show('error fetching schools !', ToastAndroid.SHORT);
            return;
        }

        if (schools) {
            //console.info('Schools fetched', schools);
            setSchools(schools);
            //schools.forEach((school) => console.log(school.school_name));
            //schools.forEach((school) => console.log(school.id));
        }
    }

    const deleteSchool = async (school_id) => {
        const { error } = await supabase
            .from('schools')
            .delete()
            .eq('id', 5); // Todo: replace wiht actual ID

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
            <View className='bg-white m-2'>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={data}
                    search
                    maxHeight={250}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select School' : '...'}
                    searchPlaceholder="Search school"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Student Name</DataTable.Title>
                    <DataTable.Title numeric>Fees Status</DataTable.Title>
                </DataTable.Header>

                {schools.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.student_id}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
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

            <View className='m-5 flex items-center justify-center'>
                <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Payment Details')}>Add</Button>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default ListPaymentDetails;