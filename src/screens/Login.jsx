import React, { useState } from 'react';
import { View, } from 'react-native';
import { supabase } from '../lib/supabase';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className='h-screen w-11/12 m-auto flex flex-col justify-around'>
        <View className=''>
          <Text variant="headlineLarge" className='text-center'>Welcome back!</Text>
          <Text variant="titleSmall" className='text-center'>Log in to your account</Text>
        </View>

        <View>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder='Username'
            left={<TextInput.Icon icon="account" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            secureTextEntry
            left={<TextInput.Icon icon="eye" />}
          />
        </View>

        <View>
          <Button icon="login" mode="contained" onPress={handleLogin}>
            Log In
          </Button>
        </View>

        {/* <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} /> */}
    </SafeAreaView>
  );
};

export default Login;
