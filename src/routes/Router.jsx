import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const RootNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const session = await AsyncStorage.getItem('supabaseSession');
      if (session) {
        setUser(JSON.parse(session).user);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user);
          AsyncStorage.setItem('supabaseSession', JSON.stringify(session));
        } else {
          setUser(null);
          AsyncStorage.removeItem('supabaseSession');
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
