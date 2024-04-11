import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';

import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

import {useUser} from '../UserContext'; // Path to your UserContext
import {useNavigation} from '@react-navigation/native';

const EditProfile = ({route}) => {
  const navigation = useNavigation();
  const CustomTouchable = ({title, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const {userId, setUserId} = useUser();
  // console.log('USER ID IN EDIT PROFILE', userId);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [incomeRange, setIncomeRange] = useState('');
  const [diningFrequency, setDiningFrequency] = useState('');
  const [profileVisibility, setProfileVisibility] = useState('Public');

  const updateUserData = async () => {
    Alert.alert(
      'Profile Updates',
      'Your profile has been successfully updated!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Profile'),
        },
      ],
    );
    const userRef = firestore().collection('users').doc(userId);

    try {
      await userRef.update({
        // Fields you want to update
        firstName: firstName,
        lastName: lastName,
        profileVisibility,
        // Add other fields you want to update here
      });
      console.log('User updated!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  //radio button values
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Public',
        value: 'Public',
      },
      {
        id: '2',
        label: 'Private',
        value: 'Private',
      },
    ],
    [],
  );

  const radioButtons2 = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'High School',
        value: 'High School',
      },
      {
        id: '2',
        label: 'Bachelors',
        value: 'Bachelors',
      },
      {
        id: '3',
        label: 'Masters',
        value: 'Masters',
      },
    ],
    [],
  );
  const [selectedId, setSelectedId] = useState();
  const [selectedId1, setSelectedId1] = useState();

  //dropdown hooks
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '18-25', value: '18-25'},
    {label: '26-35', value: '26-35'},
    {label: '36-45', value: '36-45'},
    {label: '46-55', value: '46-55'},
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: '$0 - $50,000', value: '0-50000'},
    {label: '$50,001 - $100,000', value: '50001-100000'},
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Rarely', value: 'rarely'},
    {label: 'Occasionally', value: 'occasionally'},
    {label: 'Frequently', value: 'frequently'},
  ]);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        style={styles.input}
      />
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        style={styles.input}
      />
      <Text>Age Range</Text>
      <View style={styles.box}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          modal={true}
        />
      </View>
      <Text>Income Range</Text>
      <View style={styles.box}>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          modal={true}
        />
      </View>
      <View style={styles.box}>
        <Text>How often do you dine out?</Text>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          modal={true}
        />
      </View>
      <View>
        <Text>Profile Visibility</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
        />
      </View>
      <View>
        <Text>Level of Chewology</Text>
        <RadioGroup
          radioButtons={radioButtons2}
          onPress={setSelectedId1}
          selectedId={selectedId1}
        />
      </View>
      <CustomTouchable
        title="Submit"
        onPress={() => updateUserData()}></CustomTouchable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  box: {
    margin: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  radioButtonText: {
    marginRight: 10,
  },
  radioButtonInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 8,
    height: height / 10,
    width: width,
    textAlign: 'center',
    backgroundColor: '#000000',
    marginVertical: 3,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export default EditProfile;
