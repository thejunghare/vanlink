import React from 'react';
import { View, ToastAndroid, StyleSheet } from 'react-native';
import { Text, Button, } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { supabase } from '../../lib/supabase';

const AddDriver = ({ route }) => {
    const { userId, roleId, ownerId } = route.params;
    console.info('user Id:', userId, 'role Id: ', roleId, 'owner Id: ', ownerId);

    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const [profilesDetails, setProfilesDetails] = React.useState([]);
    const [vehiclesDetails, setVehiclesDetails] = React.useState([]);
    const [selectedProfile, setSelectedProfile] = React.useState('');
    const [selectedVehicle, setSelectedVehicle] = React.useState('');

    const fetchDriverProfilesDetails = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role_id', 4);

        if (profiles) {
            //console.info('profiles fetched', profiles);
            setProfilesDetails(profiles);
            ToastAndroid.show('Profiles fetched!', ToastAndroid.SHORT);

            const mappedProfiles = profiles.map(profile => ({
                label: profile.license_number,
                value: profile.id,
            }));
            setProfilesDetails(mappedProfiles);
        } else {
            // console.error('error while fetching profiles', error);
            ToastAndroid.show('Profiles fetched!', ToastAndroid.SHORT);
        }
    };

    const fetchVehicleDetails = async () => {
        let { data: vehicles, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('owner_id', ownerId);

        if (error) {
            console.error('Error fetching vehicles:', error);
            ToastAndroid.show('Failed to fetch vehicles!', ToastAndroid.SHORT);
        }

        if (vehicles) {
            setVehiclesDetails(vehicles);
            ToastAndroid.show('Vehicles fetched!', ToastAndroid.SHORT);

            const mappedVehicles = vehicles.map(vehicle => ({
                label: vehicle.vehicle_number,
                value: vehicle.id,
            }));
            setVehiclesDetails(mappedVehicles);
        }
    };

    React.useEffect(() => {
        fetchDriverProfilesDetails();
        fetchVehicleDetails();
    }, []);

    // TODO: create insert function

    return (
        <View className={'px-3 flex-1 h-screen justify-evenly'}>
            <View className={'h-3/4'}>
                <View className='bg-white m-2'>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={profilesDetails}
                        search
                        maxHeight={250}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select profile'}
                        searchPlaceholder="Search profile"
                        value={selectedProfile}
                        onChange={item => {
                            setSelectedProfile(item.value);
                        }}
                    />
                </View>

                <View className='bg-white m-2'>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={vehiclesDetails}
                        search
                        maxHeight={250}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select van number'}
                        searchPlaceholder="Search van"
                        value={selectedVehicle}
                        onChange={item => {
                            setSelectedVehicle(item.value);
                        }}
                    />
                </View>
            </View>

            <View className='h-1/5 m-5 flex items-center justify-center'>
                <Button icon="plus" mode="contained">
                    Add Driver
                </Button>
            </View>
        </View>
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

export default AddDriver;