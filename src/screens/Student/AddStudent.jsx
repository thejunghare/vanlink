import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';

const school = [
    { label: 'St. Marys', value: '1' },
    { label: 'Sai Holy Faith', value: '2' },
];

const driver = [
    { label: 'Yogi Baba', value: '1' },
    { label: 'John Cena', value: '2' },
];


const student = [
    { label: 'Prasad Junghare', value: '1' },
    { label: 'Pooja Junghare', value: '2' },
];

const AddStudent = () => {
    const [selectedStudentProfile, setSelectedStudentProfile] = React.useState(null);
    const [selectSchool, setSelectedSchool] = React.useState(null);
    const [selectDriver, setSelectedDriver] = React.useState(null);
    const [isFocusProfile, setIsFocusProfile] = React.useState(false);
    const [isFocusSchool, setIsFocusSchool] = React.useState(false);
    const [isFocusDriver, setIsFocusDriver] = React.useState(false);

    const renderStudentProfileLabel = () => {
        if (selectedStudentProfile || isFocusProfile) {
            return (
                <Text style={[styles.label, isFocusProfile && { color: 'blue' }]}>
                    Select Student Profile
                </Text>
            );
        }
        return null;
    };

    const renderSchoolLabel = () => {
        if (selectSchool || isFocusSchool) {
            return (
                <Text style={[styles.label, isFocusSchool && { color: 'blue' }]}>
                    Select School
                </Text>
            );
        }
    }

    const renderDriverLabel = () => {
        if (selectDriver || isFocusDriver) {
            return (
                <Text style={[styles.label, isFocusDriver && { color: 'blue' }]}>
                    Select driver
                </Text>
            );
        }
    }


    return (
        <ScrollView className={'px-3 flex-1'}>
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    {/* select student profile */}
                    <View className='bg-white mt-3'>
                        {renderStudentProfileLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocusProfile && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={student}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusProfile ? 'Select Student Profile' : '...'}
                            searchPlaceholder="Search profile"
                            value={selectedStudentProfile}
                            onFocus={() => setIsFocusProfile(true)}
                            onBlur={() => setIsFocusProfile(false)}
                            onChange={item => {
                                setSelectedStudentProfile(item.value);
                                setIsFocusProfile(false);
                            }}
                        />
                    </View>

                    {/* select school */}
                    <View className='bg-white mt-3'>
                        {renderSchoolLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocusSchool && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={school}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusSchool ? 'Select School' : '...'}
                            searchPlaceholder="Search school"
                            value={selectSchool}
                            onFocus={() => setIsFocusSchool(true)}
                            onBlur={() => setIsFocusSchool(false)}
                            onChange={item => {
                                setSelectedSchool(item.value);
                                setIsFocusSchool(false);
                            }}
                        />
                    </View>

                    {/* assign driver */}
                    <View className='bg-white mt-3'>
                        {renderDriverLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocusDriver && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={driver}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusDriver ? 'Select Driver' : '...'}
                            searchPlaceholder="Search driver"
                            value={selectDriver}
                            onFocus={() => setIsFocusDriver(true)}
                            onBlur={() => setIsFocusDriver(false)}
                            onChange={item => {
                                setSelectedDriver(item.value);
                                setIsFocusDriver(false);
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