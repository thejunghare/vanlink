import React from 'react';
import { View, Text, ToastAndroid, ScrollView } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import { supabase } from '../../lib/supabase';

const AddSchool = () => {
    const [checked, setChecked] = React.useState('Morning');
    const [schoolName, setSchoolName] = React.useState('');
    const [schoolAddress, setSchoolAddress] = React.useState('');
    const [schoolShiftDetails, setSchoolShiftDetails] = React.useState('Morning');

    const resetFields = () => {
        setSchoolAddress('');
        setSchoolName('');
    }

    const insertSchool = async () => {
        const { error } = await supabase
            .from('schools')
            .insert([
                {
                    school_name: schoolName,
                    school_address: schoolAddress,
                    school_shift: schoolShiftDetails,
                    owner_id: 1 //TODO: replace with actually ID
                }
            ]);

        if (!error) {
            //console.info('vehicle added');
            resetFields();
            ToastAndroid.show('Added !', ToastAndroid.SHORT);
        } else {
            //console.error('vehicle failed', error);
            ToastAndroid.show('Failed !', ToastAndroid.SHORT);
        }
    }

    return (
        <ScrollView className={'px-3 flex-1'}>
            <View className='h-screen flex justify-evenly'>
                <View className='h-3/4'>
                    {/* school name */}
                    <TextInput
                        label='School Name'
                        placeholder='Enter School Name'
                        className={'my-3'}
                        mode='outlined'
                        onChangeText={setSchoolName}
                        value={schoolName}
                    />

                    {/* schoool address */}
                    <TextInput
                        label='School Address'
                        placeholder='Enter School Address'
                        className={'my-3'}
                        mode='outlined'
                        onChangeText={setSchoolAddress}
                        value={schoolAddress}
                    />

                    {/* shift details */}
                    <View className={'flex flex-row items-center justify-evenly'}>
                        <Text>Shift</Text>

                        {/* morning shift */}
                        <View className={'flex flex-row-reverse items-center'}>
                            <Text>Morning</Text>
                            <RadioButton
                                value='Morning'
                                status={schoolShiftDetails === 'Morning' ? 'checked' : 'unchecked'}
                                onPress={() => setSchoolShiftDetails('Morning')}
                            />
                        </View>

                        {/* afternoon shift */}
                        <View className={'flex flex-row-reverse items-center'}>
                            <Text>Afternoon</Text>
                            <RadioButton
                                value='Afternoon'
                                status={schoolShiftDetails === 'Afternoon' ? 'checked' : 'unchecked'}
                                onPress={() => setSchoolShiftDetails('Afternoon')}
                            />
                        </View>
                    </View>
                </View>

                {/* submit details */}
                <View className='h-1/5 m-5 flex items-center justify-center'>
                    <Button icon='plus' mode='contained' onPress={insertSchool}>
                        Add School
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default AddSchool;