import React from 'react';
import { View, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { Searchbar, Button, Text, IconButton } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import driverIcon from '../../assets/icons/driver.png';
import vanIcon from '../../assets/icons/van.png';
import schoolIcon from '../../assets/icons/school.png';
import studentIcon from '../../assets/icons/students.png';
import moneyIcon from '../../assets/icons/money.png';
import maintenanceIcon from '../../assets/icons/maintenance.png';

const Dashboard = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isProfileComplete, setIsProfileComplete] = React.useState(true);
    const [userRole, setUserRole] = React.useState(null);
    const [userId, setUserId] = React.useState('');
    const CustomVehicleIcon = () => (<Image source={vanIcon} style={{ width: 60, height: 60 }} />);
    const CustomDriverIcon = () => (<Image source={driverIcon} style={{ width: 60, height: 60 }} />);
    const CustomSchoolIcon = () => (<Image source={schoolIcon} style={{ width: 60, height: 60 }} />);
    const CustomStudentIcon = () => (<Image source={studentIcon} style={{ width: 60, height: 60 }} />);
    const CustomMoneyIcon = () => (<Image source={moneyIcon} style={{ width: 60, height: 60 }} />);
    const CustomMaintenanceIcon = () => (<Image source={maintenanceIcon} style={{ width: 60, height: 60 }} />);

    React.useEffect(() => {
        const fetchUserData = async () => {

            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                console.log('uuid:', user.id);
                setUserId(user.id); // Getting the logged in user

                const { data: profiles, error } = await supabase
                    .from('profiles')
                    .select('role_id')
                    .eq('id', user.id)
                    .single();

                if (profiles) {
                    console.log('user role_id:', profiles.role_id);
                    const role_id = profiles.role_id;
                    setUserRole(role_id)
                } else {
                    console.error('Error fetching user profile', error)
                }
            }
        };

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

        fetchUserData();
        fetchProfileData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleNavigation = (screenName, userID) => {
        navigation.navigate(screenName, { userID })
    }

    return (
        <View className='flex-1'>
            <View>
                {!isProfileComplete && (
                    <Text className={'bg-red-400 p-3 font-bold text-white text-center'}>
                        Unlock all features by completing your profile!
                    </Text>
                )}

                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    className='mx-5 mb-0 mt-5'
                />

                <View className='w-screen my-5 flex flex-row items-center justify-evenly'>
                    <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
                        Profile
                    </Button>
                    <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
                        Payment
                    </Button>
                </View>

                <Text variant='titleMedium' className='ml-5'>Management Dashboard</Text>
                <Text variant='titleMedium' className='ml-5'>User Role: {userRole}</Text>

                {/* owner dashboard start */}
                {userRole === 2 && (
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
                                icon={CustomDriverIcon}
                                size={60}
                                onPress={() => navigation.navigate('Driver List', { userId: userId, roleId: userRole })}
                                accessibilityLabel='Driver'
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
                    </View>
                )}
                {userRole === 2 && (
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
