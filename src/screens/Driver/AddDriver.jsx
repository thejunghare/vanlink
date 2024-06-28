import React from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const AddDriver = () => {
    const [selectedLanguage, setSelectedLanguage] = React.useState();
    return (
        <View className={'px-3 flex-1'}>
            <View className={''}>
                <TextInput
                    label="Driver Name"
                    placeholder='Prasad Junghare'
                    className={'my-3'}
                />

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Select Van Number" value=""/>
                </Picker>

                <TextInput
                    label="Mobile Number"
                    placeholder='Enter Mobile Number'
                    className={'my-3'}
                />

                <TextInput
                    label="Account Number/UPI ID"
                    placeholder='Enter Account Number'
                    className={'my-3'}
                />

                <TextInput
                    label="License Number"
                    placeholder='Enter License Number'
                    className={'my-3'}
                />

                <TextInput
                    label="Address"
                    placeholder='Enter Address'
                    className={'my-3'}
                />

                <TextInput
                    label="Aadhar Number"
                    placeholder='Enter Account Number'
                    className={'my-3'}
                />
            </View>

            <Button icon="plus" mode="contained">
                Add
            </Button>
        </View>
    )
}

export default AddDriver;