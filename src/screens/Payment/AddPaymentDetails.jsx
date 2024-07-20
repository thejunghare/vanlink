import React from 'react';
import {View, ToastAndroid, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
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

const AddPaymentDetails = ({route}) => {
    const {roleId, userId, ownerId, driverId} = route.params;
    console.log(ownerId, driverId);
    const navigation = useNavigation();
    const [schoolDetails, setSchoolDetails] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState([]);
    const [studentDetails, setStudentDetails] = React.useState([]);
    const [selectedStudent, setSelectedStudent] = React.useState([]);
    const [collectionYear, setCollectionYear] = React.useState('');
    const [collectionMonth, setCollectionMonth] = React.useState([]);
    const [totalCollection, setTotalCollection] = React.useState('');
    const [totalFees, setTotalFees] = React.useState('');

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

    const fetchStudent = async () => {
        let {data: students, error} = await supabase
            .from('students')
            .select('*')
            .eq('owner_id', ownerId);

        if (error) {
            ToastAndroid.show('error fetching schools!', ToastAndroid.SHORT);
            return;
        }

        if (students) {
            ToastAndroid.show('Students Fetched!', ToastAndroid.SHORT);

            // Fetch profile details for each student
            const profileIds = students.map(student => student.profile_id);
            let {data: profiles, error: profilesError} = await supabase
                .from('profiles')
                .select('*')
                .in('id', profileIds);

            if (profilesError) {
                ToastAndroid.show('Error fetching profiles!', ToastAndroid.SHORT);
                return;
            }

            if (profiles) {
                const mappedStudent = students.map(student => {
                    const profile = profiles.find(profile => profile.id === student.profile_id);
                    console.log('Hello', profile.student_total_fees)
                    return {
                        label: profile.username,
                        value: student.id,
                        profileDetails: profile,
                    };
                });

                setStudentDetails(mappedStudent);

                //const totalFees = profiles.reduce((sum, profile) =>  profile.student_total_fees);
                //setTotalFees(totalFees.toString());
            }
        }
    }


    const resetFields = () => {
        setSelectedSchool([]);
        setSelectedStudent([]);
        setCollectionYear('');
        setCollectionMonth('');
        setTotalCollection('');
        setTotalFees();
    }

    const insertCollections = async () => {
        const {error} = await supabase
            .from('student_fees_collection')
            .insert([
                {
                    school_id: selectedSchool,
                    student_id: selectedStudent,
                    total_fees: totalFees,
                    collection: totalCollection,
                    year: collectionYear,
                    month: collectionMonth,
                    driver_id: driverId,
                    owner_id: ownerId
                }
            ]);

        if (!error) {
            console.info('Added!');
            ToastAndroid.show('Collection added!', ToastAndroid.SHORT);
            resetFields();
        } else {
            console.log('Error', error);
            ToastAndroid.show('Error adding collection!', ToastAndroid.SHORT);
        }
    }

    React.useEffect(() => {
        fetchSchools();
        fetchStudent();
    }, []);

    return (
        <View className='h-screen flex justify-evenly mx-2'>
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

                <View className='bg-white m-2'>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={studentDetails}
                        search
                        maxHeight={250}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select student'}
                        searchPlaceholder="Search student"
                        value={selectedStudent}
                        onChange={item => {
                            setSelectedStudent(item.value);
                            const selectedStudentProfile = studentDetails.find(student => student.value === item.value).profileDetails;
                            setTotalFees(selectedStudentProfile ? selectedStudentProfile.student_total_fees.toString() : '');
                        }}
                    />
                </View>

                <View className='flex flex-row items-center justify-evenly my-1'>
                    {/* total fees */}
                    <TextInput
                        label='Total Fees'
                        placeholder='Enter total fees'
                        className={' w-2/5'}
                        keyboardType={"number-pad"}
                        mode='outlined'
                        onChangeText={setTotalFees}
                        value={totalFees}
                    />

                    {/* collection */}
                    <TextInput
                        label='Collection Amount'
                        placeholder='Enter collection amount'
                        className={' w-1/2'}
                        keyboardType={"number-pad"}
                        mode='outlined'
                        onChangeText={setTotalCollection}
                        value={totalCollection}
                    />
                </View>

                <View className='flex flex-row items-center justify-evenly my-1'>
                    {/* collection year */}
                    <TextInput
                        label='Collection Year'
                        placeholder='Enter collection year'
                        className={' w-2/5'}
                        keyboardType={"number-pad"}
                        mode='outlined'
                        onChangeText={setCollectionYear}
                        value={collectionYear}
                    />

                    {/* collection month */}
                    <View className='w-1/2 bg-white m-2'>
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
                            searchPlaceholder="Search month"
                            value={collectionMonth}
                            onChange={item => {
                                setCollectionMonth(item.value);
                            }}
                        />
                    </View>
                </View>
            </View>

            <View className='h-1/5 m-5 flex items-center justify-center'>
                <Button icon='plus' mode='contained' onPress={insertCollections}>Add
                    Collection</Button>
            </View>
        </View>
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

export default AddPaymentDetails;