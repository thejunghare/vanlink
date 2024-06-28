import React from 'react';
import { View, } from 'react-native';
import { supabase } from '../lib/supabase';
import { Searchbar, Button, Text, IconButton, MD3Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View className='flex-1'>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className='mx-5 mb-0 mt-5'
        />
        <View className='w-screen my-5 flex flex-row items-center justify-around'>
          <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
            Profile
          </Button>
          <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
            Payment
          </Button>
          <Button icon="arrow-top-right" mode="outlined" onPress={() => console.log('Pressed')}>
            Module
          </Button>
        </View>


        <Text variant='titleMedium' className='ml-5'>Management Dashboard</Text>


        <View className='my-5 flex flex-row items-center justify-around'>
          <IconButton
            icon="bus"
            size={50}
            onPress={() => navigation.navigate('Vehicle List')}
            mode='contained'
            accessibilityLabel='Vehicle'
          />
          <IconButton
            icon="account-outline"
            size={50}
             onPress={() => navigation.navigate('Driver List')}
            mode='contained'
            accessibilityLabel='Driver'
          />
          <IconButton
            icon="school-outline"
            size={50}
            onPress={() => console.log('Pressed')}
            mode='contained'
            accessibilityLabel='School'
          />
        </View>

        <View className='my-5 flex flex-row items-center justify-around'>
          <IconButton
            icon="account-multiple-outline"
            size={50}
            onPress={() => console.log('Pressed')}
            mode='contained'
            accessibilityLabel='Student'
          />
          <IconButton
            icon="currency-inr"
            size={50}
            onPress={() => console.log('Pressed')}
            mode='contained'
            accessibilityLabel='Payment'
          />
          <IconButton
            icon="camera"
            size={50}
            onPress={() => console.log('Pressed')}
            mode='contained'
            accessibilityLabel='Extra Icon'
          />
        </View>

        {/*  <Button title="Logout" mode="outlined" onPress={handleLogout} >   Logout
      </Button> */}
      </View>
    </View>
  );
};

export default Dashboard;
