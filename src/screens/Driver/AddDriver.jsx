import React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import supabase from '../../lib/supabase';

const AddDriver = () => {
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    const [profilesDetails, setProfilesDetails] = React.useState([]);
    const [vehiclesDetails, setVehiclesDetails] = React.useState([]);
    const [selectedProfile, setSelectedProfile] = React.useState('');
    const [selectedVehicle, setSelectedVehicle] = React.useState('');

    const fetchDriverProfilesDetails = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role_id', '837f9807-7b2a-4f21-b257-0beb22efb8dc');

        if (profiles) {
            //console.info('profiles fetched', profiles);
            //profiles.forEach((profile) => console.log(profile.username));
            setProfilesDetails(profiles);
        } else {
            //console.error('error while fetching profiles', error);
        }
    };

    const fetchVehicleDetails = async () => {
        let { data: vehicles, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('owner_id', '65f73490-b115-4a15-8410-24b8b09f0701'); //Todo: Replace with actuall ID

        if (vehicles) {
            console.info('vehicles fetched!', vehicles);
            setVehiclesDetails(vehicles);
        }
        else console.error('Error fetching vehicles', error);

    };

    React.useEffect(() => {
        fetchDriverProfilesDetails();
        fetchVehicleDetails();
    }, []);

    const resetFields = () => { };

    const insertDriver = () => { };

    return (
        <View className={'px-3 flex-1'}>
            <View className={''}>
                {/* <Picker
                    selectedValue={selectedProfile}
                    onValueChange={(itemValue, itemIndex) => setSelectedProfile(itemValue)}
                >
                    <Picker.Item label="Select profile" value="" />
                    {profilesDetails.map((profile) => (
                        <Picker.Item key={profile.id} label={profile.username} value={profile.id} />
                    ))}
                </Picker> */}

                <Picker
                    selectedValue={selectedVehicle}
                    onValueChange={(itemValue, itemIndex) => setSelectedVehicle(itemValue)}
                >
                    <Picker.Item label="Select vehicle" value="" />
                    {vehiclesDetails.map((vehicle) => (
                        <Picker.Item key={vehicle.id} label={vehicle.vehicle_number} value={vehicle.id} />
                    ))}
                </Picker>

                <TextInput
                    label="Mobile Number"
                    placeholder='Enter Mobile Number'
                    className={'my-3'}
                />

                <TextInput
                    label="Account Number/UPI ID"
                    placeholder='Enter Account Number'
                    className={'my-3'}
                />

                <TextInput
                    label="License Number"
                    placeholder='Enter License Number'
                    className={'my-3'}
                />

                <TextInput
                    label="Address"
                    placeholder='Enter Address'
                    className={'my-3'}
                />

                <TextInput
                    label="Aadhar Number"
                    placeholder='Enter Account Number'
                    className={'my-3'}
                />
            </View>

            <Button icon="plus" mode="contained">
                Add
            </Button>
        </View>
    )
}

export default AddDriver;