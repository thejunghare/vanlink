import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { supabase } from '../lib/supabase';

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      navigation.replace('Login'); // Navigate to login screen after logout
    };
    logout();
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreen;
