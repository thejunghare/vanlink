import React from 'react';
import { View, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { Searchbar, Button, Text, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import driverIcon from '../../assets/icons/driver.png';
import vanMaintenanceIcon from '../../assets/icons/van.png';
import schoolIcon from '../../assets/icons/school.png';
import studentIcon from '../../assets/icons/students.png';
import moneyIcon from '../../assets/icons/money.png';
import vehicleIcon from '../../assets/icons/vehicle.png';

const Dashboard = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isProfileComplete, setIsProfileComplete] = React.useState(true);
    const [userRole, setUserRole] = React.useState(null);
    const [userId, setUserId] = React.useState('');
    const [profileId, setProfileId] = React.useState('');
    const [ownerId, setOwnerId] = React.useState('');
    const [driverId, setDriverId] = React.useState('');
    const [ownerWithDriverId, setOwnerWithDriverId] = React.useState('');
    const CustomVehicleIcon = () => (<Image source={vehicleIcon} style={{ width: 60, height: 60 }} />);
    const CustomDriverIcon = () => (<Image source={driverIcon} style={{ width: 60, height: 60 }} />);
    const CustomSchoolIcon = () => (<Image source={schoolIcon} style={{ width: 60, height: 60 }} />);
    const CustomStudentIcon = () => (<Image source={studentIcon} style={{ width: 60, height: 60 }} />);
    const CustomMoneyIcon = () => (<Image source={moneyIcon} style={{ width: 60, height: 60 }} />);
    const CustomMaintenanceIcon = () => (<Image source={vanMaintenanceIcon} style={{ width: 60, height: 60 }} />);

    // fetch user detials here
    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            //console.log('uuid:', user.id);
            setUserId(user.id); // Getting the logged in user

            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profiles) {
                //console.info('user role_id:', profiles.role_id);
                const role_id = profiles.role_id;
                setUserRole(role_id) // get loggedIn user role Id

                //console.info('User profile id: ', profiles.id);
                const profile_Id = profiles.id
                setProfileId(profile_Id) // get loggedIn user profile Id

                if ((role_id === 2) || (role_id === 3)) {
                    let { data: owners, error } = await supabase
                        .from('owners')
                        .select('*')
                        .eq('profile_id', profile_Id)
                        .single();

                    if (owners) {
                        //console.info('Logged in user owner info: ', owners);
                        const owner_id = owners.id
                        //console.log('Logged in user owner id', owner_id)
                        setOwnerId(owners.id);
                    } else {
                        console.error('Error fetching owner info', error);
                    }
                }
            } else {
                console.error('Error fetching user profile', error)
            }
        }
    };

    // fetch profiles details here
    const fetchProfileData = async () => {
        const user = supabase.auth.user();
        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user.id)
                .single();

            if (data && !data.required_column) {
                setIsProfileComplete(false);
            }
        }
    };

    React.useEffect(() => {
        fetchUserData();
        fetchProfileData();
    }, []);

    // handle logout here
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // handle navigation
    const handleNavigation = (screenName, userID) => {
        navigation.navigate(screenName, { userID })
    }

    return (
        <View className='flex-1'>
            <View>
                {/* profile complete alert */}
                {!isProfileComplete && (
                    <Text className={'bg-red-400 p-3 font-bold text-white text-center'}>
                        Unlock all features by completing your profile!
                    </Text>
                )}

                {/* search bar */}
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    className='mx-5 mb-0 mt-5'
                />

                {/* recents button */}
                <View className='w-4/5 m-auto my-5 flex flex-row items-center justify-evenly'>
                    <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
                        Profile
                    </Button>
                    <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
                        Payment
                    </Button>
                </View>

                <Text variant='titleMedium' className='ml-5'>Management Dashboard</Text>

                {/* logged in user details only for devlopment purpose */}
               {/*  <View className='flex flex-row items-center justify-start'>
                    <Text variant='titleMedium' className='ml-5'>user ID: {userRole}</Text>
                    <Text variant='titleMedium' className='ml-5'>owner ID: {ownerId}</Text>
                    <Text variant='titleMedium' className='ml-5'>Role ID: {userRole}</Text>
                </View> */}

                {/* owner dashboard start */}
                {userRole === 2 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomVehicleIcon}
                                size={60}
                                onPress={() => navigation.navigate('Vehicle List', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='Vehicle'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomDriverIcon}
                                size={60}
                                onPress={() => navigation.navigate('Driver List', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='Driver'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={60}
                                onPress={() => navigation.navigate('School List', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='School'
                            />
                        </View>
                    </View>
                )}
                {userRole === 2 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={60}
                                onPress={() => navigation.navigate('Student List', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='Student'
                            />
                        </View>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={60}
                                onPress={() => navigation.navigate('Payment Details', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='Payment'
                            />
                        </View>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={60}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', { userId: userId, roleId: userRole, ownerId: ownerId })}
                                accessibilityLabel='Extra Icon'
                            />
                        </View>
                    </View>
                )}

                {/* owner dashboard end */}

                {/* both dashboard start */}
                {userRole === 3 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomVehicleIcon}
                                size={60}
                                onPress={() => handleNavigation('Vehicle List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Vehicle'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={60}
                                onPress={() => navigation.navigate('School List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='School'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={60}
                                onPress={() => navigation.navigate('Student List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Student'
                            />
                        </View>
                    </View>
                )}
                {userRole === 3 && (
                    <View className='my-5 flex flex-row justify-around '>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={60}
                                onPress={() => navigation.navigate('Payment Details', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Payment'
                            />
                        </View>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={60}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Maintenance'
                            />
                        </View>
                    </View>
                )}
                {/* Both dashboard end */}

                {/* drive dashboard start */}
                {userRole === 4 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={60}
                                onPress={() => navigation.navigate('Student List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Student'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={60}
                                onPress={() => navigation.navigate('School List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='School'
                            />
                        </View>

                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={60}
                                onPress={() => navigation.navigate('Payment Details', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Payment'
                            />
                        </View>
                    </View>
                )}

                {userRole === 4 && (
                    <View className='m-5 flex flex-row items-center justify-start'>
                        <View className={'border border-slate-300 rounded-lg bg-white flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={60}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Maintenance'
                            />
                        </View>
                    </View>
                )}
                {/* drive dashboard end */}

            </View>
            <StatusBar style="light" backgroundColor={'#324AB2'} />
        </View>
    );
};

export default Dashboard;
