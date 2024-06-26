import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {supabase} from '../lib/supabase';
import {Text, TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <View className='h-screen w-11/12 m-auto flex flex-col justify-around'>
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
                            left={<TextInput.Icon icon="account"/>}
                        />

                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Password'
                            secureTextEntry
                            left={<TextInput.Icon icon="eye"/>}
                        />
                    </View>

                    <View>
                        <Button icon="login" mode="contained" onPress={handleLogin}>
                            Log In
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Login;
