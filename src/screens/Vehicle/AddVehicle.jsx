import React from 'react';
import { View, ToastAndroid, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { supabase } from '../../lib/supabase';

const AddVehicle = ({ route }) => {
  const { userId, roleId, ownerId } = route.params;
  console.info('Route params data on vehicle add screen: ', userId, roleId, ownerId);

  const [vehicleNumber, setVehicleNumber] = React.useState('');
  const [vehicleModel, setVehicleModel] = React.useState('');
  const [vehicleCapacity, setVehicleCapacity] = React.useState('');

  React.useEffect(() => {


  }, []);

  const resetFields = () => {
    setVehicleNumber('');
    setVehicleModel('');
    setVehicleCapacity('');
  }

  const insertVehicle = async () => {
    if (!vehicleNumber || !vehicleCapacity || !vehicleModel) {
      //console.error('All fildes are required unless marked optional')
      ToastAndroid.show('All fildes are required unless marked optional !', ToastAndroid.SHORT);
    }

    if (!vehicleNumber)
      ToastAndroid.show('All fildes are required unless marked optional !', ToastAndroid.SHORT);


    if (!vehicleModel)
      ToastAndroid.show(' !', ToastAndroid.SHORT);

    if (!vehicleCapacity)
      ToastAndroid.show('All fildes are required unless marked optional !', ToastAndroid.SHORT);


    const { error } = await supabase.from('vehicles').insert(
      {
        vehicle_number: vehicleNumber,
        vehicle_modal: vehicleModel,
        vehicle_capacity: vehicleCapacity,
        owner_id: ownerId,
      },
    );

    if (error)
      //console.error('error adding vehicle', error)
      ToastAndroid.show('Error adding vehicle !', ToastAndroid.SHORT);
    else
      //console.info('vehicle added')
      resetFields();
    ToastAndroid.show('Added !', ToastAndroid.SHORT);

  };

  return (
    <ScrollView className={'px-3 flex-1'}>
      <View className='h-screen flex justify-evenly'>
        <View className='h-3/4'>
          {/* vehicle number */}
          <TextInput
            label='Vechile Number'
            placeholder='Enter vehicle number'
            className={'my-3'}
            mode='outlined'
            onChangeText={setVehicleNumber}
            value={vehicleNumber}
          />

          {/* vehicle model */}
          <TextInput
            label='Model Name'
            placeholder='Enter vehicle model name'
            className={'my-3'}
            mode='outlined'
            onChangeText={setVehicleModel}
            value={vehicleModel}
          />

          {/* vehicle capacity */}
          <TextInput
            label='Vehicle Capacity'
            placeholder='Enter vehicle capacity'
            className={'my-3'}
            mode='outlined'
            onChangeText={setVehicleCapacity}
            value={vehicleCapacity}
            keyboardType="numeric"
          />
        </View>

        <View className='h-1/5 m-5 flex items-center justify-center'>
          <Button icon='plus' mode='contained' onPress={insertVehicle}>
            Add Vehicle
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddVehicle;
