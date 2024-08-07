import React from 'react';
import {View, RefreshControl, ScrollView, ToastAndroid} from 'react-native';
import {Text, Button, DataTable, IconButton, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../../lib/supabase';

const StudentList = ({route}) => {
    const {roleId, userId, ownerId, driverId} = route.params;
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [students, setStudents] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState();

    const fetchStudentDetails = async () => {
        let { data: students, error } = await supabase
            .from('students')
            .select('*')
            .eq('owner_id', ownerId);

        if (!error) {
            ToastAndroid.show('Students Fetched!', ToastAndroid.SHORT);

            const studentsWithProfiles = await Promise.all(students.map(async student => {
                let { data: profile, error: profile_error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', student.profile_id)
                    .single();

                if (profile) {
                    return { ...student, ...profile };
                } else {
                    return student;
                }
            }));

            setStudents(studentsWithProfiles);
        } else {
            ToastAndroid.show('Error while fetching students!', ToastAndroid.SHORT);
        }
    };


    const deleteStudent = async (id) => {
        const {error} = await supabase
            .from('students')
            .delete()
            .eq('id', id);

        if (!error) {
            console.info('Deleted student!');
            ToastAndroid.show('Student deleted!', ToastAndroid.SHORT);
            fetchStudentDetails();
        } else {
            console.error('Failed to delete!');
            ToastAndroid.show('Failed to delete!', ToastAndroid.SHORT);
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchStudentDetails().finally(() => setRefreshing(false));
        }, 2000);
    })

    React.useEffect(() => {
        setPage(0);
        fetchStudentDetails();
    }, [itemsPerPage]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, students.length);

    return (
        <ScrollView
            className={'flex-1'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>

            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    <View className={'m-3'}>
                        <Searchbar
                            placeholder='Search Student'
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Student Name</DataTable.Title>
                            <DataTable.Title numeric>Actions</DataTable.Title>
                        </DataTable.Header>

                        {students.slice(from, to).map((student) => (
                            <DataTable.Row key={student.id}>
                                <DataTable.Cell>{student.username}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <IconButton
                                        icon='eye'
                                        onPress={() =>
                                            navigation.navigate('Student Details', {student})}
                                    />

                                    {(roleId === 2 || roleId === 3) && (
                                        <IconButton
                                            icon='pencil'
                                            onPress={() =>
                                                navigation.navigate('Add Student', {itemKey: student.id})
                                            }
                                        />
                                    )}

                                    {(roleId === 2 || roleId === 3) && (
                                        <IconButton
                                            icon='delete'
                                            onPress={() => deleteStudent(student.id)}
                                        />
                                    )}
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}

                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(students.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} of ${students.length}`}
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
                        <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Student', {
                            userId: userId,
                            roleId: roleId,
                            ownerId: ownerId
                        })}>Add
                            Student</Button>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default StudentList;
