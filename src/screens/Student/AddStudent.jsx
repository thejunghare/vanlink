import React from 'react';
import { View, ToastAndroid, StyleSheet, ScrollView } from 'react-native';
import { Button, } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../lib/supabase';

const AddStudent = ({ route }) => {
    const { userId, roleId, ownerId } = route.params;
    console.info('user Id:', userId, 'role Id: ', roleId, 'owner Id: ', ownerId);
    // for school
    const [schoolDetails, setSchoolDetails] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState([]);
    // for dirver
    const [driverDetails, setDriverDetails] = React.useState([]);
    const [selectedDriver, setSelectedDriver] = React.useState([]);
    // for profile
    const [profileDetails, setProfileDetails] = React.useState([]);
    const [selectedProfile, setSelectedProfile] = React.useState([]);

    const fetchProfiles = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role_id', 5);

        if (profiles) {
            //console.info('profiles fetched', profiles);
            setProfileDetails(profiles);
            ToastAndroid.show('Profiles fetched!', ToastAndroid.SHORT);

            const mappedProfiles = profiles.map(profile => ({
                label: profile.student_gr,
                value: profile.id,
            }));
            setProfileDetails(mappedProfiles);
        } else {
            // console.error('error while fetching profiles', error);
            ToastAndroid.show('Profiles fetched!', ToastAndroid.SHORT);
        }
    };

    const fetchSchool = async () => {
        let { data: schools, error } = await supabase
            .from('schools')
            .select('*')
            .eq('owner_id', ownerId);

        if (schools) {
            //console.info('profiles fetched', schools);
            //setSchoolDetails(schools);
            ToastAndroid.show('Schools fetched!', ToastAndroid.SHORT);

            const mappedSchools = schools.map(school => ({
                label: school.school_name,
                value: school.id,
            }));
            setSchoolDetails(mappedSchools);
        } else {
            // console.error('error while fetching schools', error);
            ToastAndroid.show('Schools fetched!', ToastAndroid.SHORT);
        }
    };

    const fetchDrivers = async () => {
        let { data: drivers, error } = await supabase
            .from('drivers')
            .select('*')
            .eq('employer_id', ownerId);

        if (drivers) {
            //console.info('profiles fetched', schools);
            //setSchoolDetails(schools);
            ToastAndroid.show('Schools fetched!', ToastAndroid.SHORT);

            const mappedDrivers = drivers.map(driver => ({
                label: driver.profile_id,
                value: driver.id,
            }));
            setDriverDetails(mappedDrivers);
        } else {
            // console.error('error while fetching schools', error);
            ToastAndroid.show('Schools fetched!', ToastAndroid.SHORT);
        }
    };

    React.useEffect(() => {
        fetchProfiles();
        fetchSchool();
        fetchDrivers();
    }, []);

    // TODO:insert funciton

    return (
        <ScrollView className={'px-3 flex-1'}>
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    {/* select student profile */}
                    <View className='bg-white mt-3'>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={profileDetails}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Student Profile'}
                            searchPlaceholder="Search profile"
                            value={selectedProfile}
                            onChange={item => {
                                setSelectedProfile(item.value);
                            }}
                        />
                    </View>

                    {/* select school */}
                    <View className='bg-white mt-3'>
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

                    {/* assign driver */}
                    <View className='bg-white mt-3'>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={driverDetails}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Driver'}
                            searchPlaceholder="Search driver"
                            value={selectedDriver}
                            onChange={item => {
                                setSelectedDriver(item.value);
                            }}
                        />
                    </View>
                </View>

                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button icon="plus" mode="contained">
                        Add Student
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

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

export default AddStudent;