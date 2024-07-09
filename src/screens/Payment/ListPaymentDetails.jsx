import React from 'react';
import {View, RefreshControl, ScrollView, ToastAndroid, StyleSheet} from 'react-native';
import {Button, DataTable, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {supabase} from '../../lib/supabase';

const months = [
    {label: 'January', value: '1'},
    {label: 'February', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
];

const ListPaymentDetails = ({route}) => {
    const {roleId, userId, ownerId, driverId} = route.params;
    console.log(ownerId, driverId);
    const navigation = useNavigation();
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [refreshing, setRefreshing] = React.useState();
    const [collectionDetails, setCollectionDetails] = React.useState([]);
    // school picker
    const [schoolDetails, setSchoolDetails] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState([]);
    // collection Month
    const [collectionMonth, setCollectiondMonth] = React.useState([]);
    // collection year
    const [collectionYear, setCollectionYear] = React.useState('');

    const fetchSchools = async () => {
        let {data: schools, error} = await supabase
            .from('schools')
            .select('*')
            .eq('owner_id', ownerId);

        if (error) {
            //console.error("Error fetching schools:", error);
            ToastAndroid.show('error fetching schools !', ToastAndroid.SHORT);
            return;
        }

        if (schools) {
            //console.info('Schools fetched', schools);
            ToastAndroid.show('Schools Fetched!', ToastAndroid.SHORT);
            const mappedSchools = schools.map(school => ({
                label: school.school_name,
                value: school.id,
            }));

            setSchoolDetails(mappedSchools)
        }
    }

    const fetchFeesDetails = async () => {
        let {data: feesDetails, error} = await supabase
            .from('student_fees_collection')
            .select('*')
            .eq('owner_id', ownerId)
            .eq('year', collectionYear)
            .eq('month', collectionMonth);

        if (feesDetails) {
            console.log('Details fetched!');
            setCollectionDetails(feesDetails);
        } else {
            console.error('Failed to fetch details', error);
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
        if (collectionYear && collectionMonth) {
            fetchFeesDetails();
        }
    }, [itemsPerPage, collectionYear, collectionMonth]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, collectionDetails.length);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    {/* select school */}
                    <View className='bg-white m-2'>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={schoolDetails}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select School'}
                            searchPlaceholder="Search school"
                            value={selectedSchool}
                            onChange={item => {
                                setSelectedSchool(item.value);
                            }}
                        />
                    </View>

                    {/* select month */}
                    <View className='flex flex-row items-center justify-between'>
                        <View className='w-2/5 bg-white m-2'>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={months}
                                search
                                maxHeight={250}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select month'}
                                searchPlaceholder="Search school"
                                value={collectionMonth}
                                onChange={item => {
                                    setCollectiondMonth(item.value);
                                }}
                            />
                        </View>

                        {/* select year */}
                        <View className='w-2/5 m-2'>
                            <TextInput
                                label="Year"
                                placeholder='Enter year'
                                className={'my-3'}
                                keyboardType={"number-pad"}
                                mode='outlined'
                                onChangeText={setCollectionYear}
                                value={collectionYear}
                            />
                        </View>
                    </View>


                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Student Name</DataTable.Title>
                            <DataTable.Title numeric>Fees Status</DataTable.Title>
                        </DataTable.Header>

                        {collectionDetails.slice(from, to).map((item) => (
                            <DataTable.Row key={item.key}>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>
                                    {item.total_fees === item.collection ? 'Paid' : 'Unpaid'}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(collectionDetails.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${collectionDetails.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={'Rows per page'}
                        />
                    </DataTable>
                </View>


                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Payment Details', {
                        userId: userId,
                        roleId: roleId,
                        ownerId: ownerId,
                        driverId: driverId
                    })}>Add Collection</Button>
                </View>
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