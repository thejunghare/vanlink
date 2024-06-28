import React from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput, RadioButton} from 'react-native-paper';

const AddSchool = () => {
    const [checked, setChecked] = React.useState('Morning');
    return (
        <View className={'px-3 flex-1'}>
            <View className={''}>
                <TextInput
                    label="School Name"
                    placeholder='Enter School Name'
                    className={'my-3'}
                />

                <TextInput
                    label="School Address"
                    placeholder='Enter School Address'
                    className={'my-3'}
                />
                <View className={'flex flex-row items-center justify-evenly'}>
                    <Text>Shift</Text>
                    <View className={'flex flex-row-reverse items-center'}>
                        <Text>Morning</Text>
                        <RadioButton
                            value="Morning"
                            status={checked === 'Morning' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Morning')}
                        />
                    </View>

                    <View className={'flex flex-row-reverse items-center'}>
                        <Text>Afternoon</Text>
                        <RadioButton
                            value="Afternoon"
                            status={checked === 'Afternoon' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('Afternoon')}
                        />
                    </View>
                </View>

            </View>

            <Button icon="plus" mode="contained">
                Add
            </Button>
        </View>
    )
}

export default AddSchool;