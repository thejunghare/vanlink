// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Dashboard;
