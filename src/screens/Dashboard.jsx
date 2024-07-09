import React from 'react';
import {View, Image,} from 'react-native';
import {supabase} from '../lib/supabase';
import {Searchbar, Button, Text, IconButton} from 'react-native-paper';
import {StatusBar} from 'expo-status-bar';
import driverIcon from '../../assets/icons/driver.png';
import vanMaintenanceIcon from '../../assets/icons/van.png';
import schoolIcon from '../../assets/icons/school.png';
import studentIcon from '../../assets/icons/students.png';
import moneyIcon from '../../assets/icons/money.png';
import vehicleIcon from '../../assets/icons/vehicle.png';

const Dashboard = ({navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isProfileComplete, setIsProfileComplete] = React.useState(true);
    const [userRole, setUserRole] = React.useState(null);
    const [userId, setUserId] = React.useState('');
    const [profileId, setProfileId] = React.useState('');
    const [ownerId, setOwnerId] = React.useState('');
    const [driverEmployerId, setDriverEmployerId] = React.useState('');
    const [driverId, setDriverId] = React.useState('');
    const [ownerWithDriverId, setOwnerWithDriverId] = React.useState('');
    const CustomVehicleIcon = () => (<Image source={vehicleIcon} style={{width: 70, height: 70}}/>);
    const CustomDriverIcon = () => (<Image source={driverIcon} style={{width: 70, height: 70}}/>);
    const CustomSchoolIcon = () => (<Image source={schoolIcon} style={{width: 70, height: 70}}/>);
    const CustomStudentIcon = () => (<Image source={studentIcon} style={{width: 70, height: 70}}/>);
    const CustomMoneyIcon = () => (<Image source={moneyIcon} style={{width: 70, height: 70}}/>);
    const CustomMaintenanceIcon = () => (<Image source={vanMaintenanceIcon} style={{width: 70, height: 70}}/>);

    // fetch user detials here
    const fetchUserData = async () => {
        const {data: {user}} = await supabase.auth.getUser();
        if (user) {
            //console.log('uuid:', user.id);
            setUserId(user.id); // Getting the logged in user

            const {data: profiles, error} = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profiles) {
                //console.info('user role_id:', profiles.role_id);
                const role_id = profiles.role_id;
                setUserRole(role_id) // get loggedIn user role Id

                console.info('profile id: ', profiles.id);
                const profile_Id = profiles.id
                setProfileId(profile_Id) // get loggedIn user profile Id

                // for owner & driver
                if (role_id === 3) {
                    // get owner id and info
                    let {data: owners, error} = await supabase
                        .from('owners')
                        .select('*')
                        .eq('profile_id', profile_Id)
                        .single();

                    if (owners) {
                        //console.info('Logged in user driver info: ', owners);
                        console.log('owner id', owners.id)
                        setOwnerWithDriverId(owners.id);
                    } else {
                        console.error('Error fetching driver info', error);
                    }
                }

                // for drivers
                if (role_id === 4) {
                    let {data: drivers, error} = await supabase
                        .from('drivers')
                        .select('*')
                        .eq('profile_id', profile_Id)
                        .single();

                    if (drivers) {
                        //console.info('Logged in user driver info: ', drivers);
                        //console.log('Logged in user driver id', owner_id)
                        setDriverEmployerId(drivers.employer_id);
                        setDriverId(drivers.id);
                    } else {
                        console.error('Error fetching driver info', error);
                    }
                }

                // for owners
                if (role_id === 2) {
                    let {data: owners, error} = await supabase
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
            const {data, error} = await supabase
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
        navigation.navigate(screenName, {userID})
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
{/*                <View className='flex flex-row items-center justify-start'>
                    <Text variant='titleMedium' className='ml-5'>user ID: {userRole}</Text>
                    <Text variant='titleMedium' className='ml-5'>owner ID: {ownerId}</Text>
                    <Text variant='titleMedium' className='ml-5'>Role ID: {userRole}</Text>
                    <Text variant='titleMedium' className='ml-5'>driver ID: {driverId}</Text>
                </View>*/}

                {/* owner dashboard start */}
                {userRole === 2 && (
                    <View className='w-screen my-5 flex flex-row items-center justify-around'>
                        <View className={' w-1/3 flex items-center'}>
                            <IconButton
                                icon={CustomVehicleIcon}
                                size={80}
                                onPress={() => navigation.navigate('Vehicle List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='Vehicle'
                                className='border border-slate-50 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased tracking-wide'>Vehicle</Text>
                        </View>

                        <View className={' w-1/3 flex items-center'}>
                            <IconButton
                                icon={CustomDriverIcon}
                                size={80}
                                onPress={() => navigation.navigate('Driver List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='Driver'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased tracking-wide'>Driver</Text>
                        </View>

                        <View className={'w-1/3 flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={80}
                                onPress={() => navigation.navigate('School List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='School'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased tracking-wide'>School</Text>
                        </View>
                    </View>
                )}
                {userRole === 2 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={' flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={80}
                                onPress={() => navigation.navigate('Student List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='Student'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased tracking-wide'>Student</Text>
                        </View>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={80}
                                onPress={() => navigation.navigate('Payment Details', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='Payment'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased tracking-wide'>Payment</Text>
                        </View>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={80}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerId
                                })}
                                accessibilityLabel='Maintenance'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased'>Maintenance</Text>
                        </View>
                    </View>
                )}

                {/* owner dashboard end */}

                {/* both dashboard start */}
                {userRole === 3 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomVehicleIcon}
                                size={80}
                                onPress={() => navigation.navigate('Vehicle List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerWithDriverId
                                })}
                                accessibilityLabel='Vehicle'
                                className='border border-slate-300 rounded-lg bg-white '
                            />
                            <Text className='text-base font-medium antialiased'>Vehicles</Text>
                        </View>

                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={80}
                                onPress={() => navigation.navigate('School List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerWithDriverId
                                })}
                                className='border border-slate-300 rounded-lg bg-white '
                                accessibilityLabel='School'
                            />
                            <Text className='text-base font-medium antialiased'>Schools</Text>
                        </View>

                        <View className={' flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={80}
                                onPress={() => navigation.navigate('Student List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerWithDriverId
                                })}
                                className='border border-slate-300 rounded-lg bg-white '
                                accessibilityLabel='Student'
                            />
                            <Text className='text-base font-medium antialiased'>Students</Text>
                        </View>
                    </View>
                )}
                {userRole === 3 && (
                    <View className='my-5 flex flex-row justify-around '>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={80}
                                onPress={() => navigation.navigate('Payment Details', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerWithDriverId
                                })}
                                accessibilityLabel='Payment'
                                className='border border-slate-300 rounded-lg bg-white '
                            />
                            <Text className='text-base font-medium antialiased'>Payment</Text>
                        </View>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={80}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: ownerWithDriverId
                                })}
                                accessibilityLabel='Maintenance'
                                className='border border-slate-300 rounded-lg bg-white '
                            />
                            <Text className='text-base font-medium antialiased'>Maintenance</Text>
                        </View>
                    </View>
                )}
                {/* Both dashboard end */}

                {/* drive dashboard start */}
                {userRole === 4 && (
                    <View className='my-5 flex flex-row items-center justify-around'>
                        <View className={' flex items-center'}>
                            <IconButton
                                icon={CustomStudentIcon}
                                size={80}
                                onPress={() => navigation.navigate('Student List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: driverEmployerId, // employer ID
                                    driverId: driverId
                                })}
                                accessibilityLabel='Student'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased'>Students</Text>
                        </View>

                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomSchoolIcon}
                                size={80}
                                onPress={() => navigation.navigate('School List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: driverEmployerId, // employer ID
                                    driverId: driverId
                                })}
                                accessibilityLabel='School'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased'>Schools</Text>
                        </View>

                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMoneyIcon}
                                size={80}
                                onPress={() => navigation.navigate('Payment Details', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: driverEmployerId, // employer ID
                                    driverId: driverId
                                })}
                                accessibilityLabel='Payment'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased'>Payment</Text>
                        </View>
                    </View>
                )}

                {userRole === 4 && (
                    <View className='m-5 flex flex-row items-center justify-start'>
                        <View className={'flex items-center'}>
                            <IconButton
                                icon={CustomMaintenanceIcon}
                                size={80}
                                onPress={() => navigation.navigate('Vehicel Maintenance Record List', {
                                    userId: userId,
                                    roleId: userRole,
                                    ownerId: driverEmployerId, // employer ID
                                    driverId: driverId
                                })}
                                accessibilityLabel='Maintenance'
                                className='border border-slate-300 rounded-lg bg-white'
                            />
                            <Text className='text-base font-medium antialiased'>Maintenance</Text>
                        </View>
                    </View>
                )}
                {/* drive dashboard end */}

            </View>
            <StatusBar style="light" backgroundColor={'#324AB2'}/>
        </View>
    );
};

export default Dashboard;
