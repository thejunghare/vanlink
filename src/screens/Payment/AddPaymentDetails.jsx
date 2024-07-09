import React from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../lib/supabase';

const AddPaymentDetails = ({ route }) => {
    const { roleId, userId, ownerId } = route.params;
    const navigation = useNavigation();
    const [schoolDetails, setSchoolDetails] = React.useState([]);
    const [selectedSchool, setSelectedSchool] = React.useState([]);

    // const [schoolDetails, setSchoolDetails] = React.useState([]);
    // const [selectedSchool, setSelectedSchool] = React.useState([]);

    const fetchSchools = async () => {
        let { data: schools, error } = await supabase
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

    React.useEffect(() => {
        fetchSchools();
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
                        data={schoolDetails}
                        search
                        maxHeight={250}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select student'}
                        searchPlaceholder="Search student"
                        value={selectedSchool}
                        onChange={item => {
                            setSelectedSchool(item.value);
                        }}
                    />
                </View>

                <View className='flex flex-row items-center justify-evenly my-1'>
                    {/* total fees */}
                    <TextInput
                        label='Total Fees'
                        placeholder='Enter total fees'
                        className={' w-2/5'}
                        mode='outlined'
                    />

                    {/* collection */}
                    <TextInput
                        label='Collection Amount'
                        placeholder='Enter collection amount'
                        className={' w-1/2'}
                        mode='outlined'
                    />
                </View>
            </View>

            <View className='h-1/5 m-5 flex items-center justify-center'>
                <Button icon='plus' mode='contained' onPress={() => navigation.navigate('Add Payment Details')}>Add Collection</Button>
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