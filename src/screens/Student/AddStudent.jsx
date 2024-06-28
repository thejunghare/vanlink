import React from 'react';
import {View, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const AddStudent = () => {
    const [checked, setChecked] = React.useState('Morning');
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    return (
        <View className={'px-3 flex-1'}>
            <View className={''}>
                <TextInput
                    label="Student Name"
                    placeholder='Enter Student Name'
                    className={'my-3'}
                />

                <TextInput
                    label="Student Blood Group"
                    placeholder='Enter Student Blood Group'
                    className={'my-3'}
                />

                <TextInput
                    label="Student Standard/Class"
                    placeholder='Enter Student Standard/Class'
                    className={'my-3'}
                />

                <TextInput
                    label="Student Division"
                    placeholder='Enter Student Division'
                    className={'my-3'}
                />

                <TextInput
                    label="Student Address"
                    placeholder='Enter Student Address'
                    className={'my-3'}
                />

                <TextInput
                    label="Student Pick-up Point"
                    placeholder='Enter Student Pick-up Point'
                    className={'my-3'}
                />

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Select School" value=""/>
                </Picker>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Select Driver" value=""/>
                </Picker>
            </View>

            <Button icon="plus" mode="contained">
                Add
            </Button>
        </View>
    )
}

export default AddStudent;