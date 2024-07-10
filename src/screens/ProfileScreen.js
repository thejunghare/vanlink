import React from 'react';
import { View, RefreshControl, ScrollView, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';

const ProfileScreen = ({ route }) => {
    const { userId, roleId, profileId } = route.params;
    console.log(profileId);
    const [userFullName, setUserFullName] = React.useState('');
    const [userUserName, setUserUserName] = React.useState('');
    const [userUpiNumber, setUserUpiNumber] = React.useState('');
    const [userLicenseNumber, setUserLicenseNumber] = React.useState('');
    const [refreshing, setRefreshing] = React.useState();
    const [] = React.useState();
    const [] = React.useState();

    const fetchProfileDetails = async () => {
        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', profileId)
            .single();

        if (profiles) {
            console.info('Profile Fetched!', profiles);
            setUserUserName(profiles.username);
            setUserFullName(profiles.full_name);
            setUserUpiNumber(profiles.upi_number);
            setUserLicenseNumber(profiles.license_number);
        } else {
            console.error('Failed fetching profiles', error);
        }
    };

    React.useEffect(() => {
        fetchProfileDetails();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchProfileDetails().finally(() => setRefreshing(false));
        }, 2000);
    })

    return (
        <ScrollView
            className={'flex-1 p-3'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/*username*/}
            <TextInput
                label="Username"
                value={userUserName}
                mode={'outlined'}
                className={'my-3'}
            />

            {/*full name*/}
            <TextInput
                label="Full Name"
                value={userFullName}
                mode={'outlined'}
                className={'my-3'}
            />

            {/*upi number*/}
            <TextInput
                label="UPI Number"
                value={userUpiNumber}
                mode={'outlined'}
                className={'my-3'}
            />

            {/*license number*/}
            {roleId === 3 && (
                <TextInput
                    label="License Number"
                    value={userLicenseNumber}
                    mode={'outlined'}
                    className={'my-3'}
                />
            )}

            {/*student standard*/}
            {roleId === 5 && (
                <TextInput
                    label="Standard"
                    mode={'outlined'}
                    className={'my-3'}
                />
            )}

            {/*student division*/}
            {roleId === 5 && (
                <TextInput
                    label="Division"
                    mode={'outlined'}
                    className={'my-3'}
                />
            )}

            {/*student gr*/}
            {roleId === 5 && (
                <TextInput
                    label="GR Number"
                    mode={'outlined'}
                    className={'my-3'}
                />
            )}

            {/*student shift*/}
            {roleId === 5 && (
                <TextInput
                    label="Shift"
                    mode={'outlined'}
                    className={'my-3'}
                />
            )}
        </ScrollView>
    );
};

export default ProfileScreen;
