import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput, 
  Button
} from 'react-native';

import {useAuth} from '../App';

const ProfileComponent = () => {
  // image from net for testing
  const {
    SignOut,
    user,
    axiosInstance,
    totalSpend,
    totalEarning,
    totalSavings,
    setTotalEarning,
    setTotalSavings,
    setTotalSpend,
    currentMonthExpenses,
    setCurrentMonthExpenses,
    currentMonthSavings,
    setCurrentMonthSavings,
    currentMonthEarnings,
    setCurrentMonthEarnings
  } = useAuth();


  const image = {uri: user.photo};
  const handleLogout = () => {
    // Logic for handling logout
    SignOut();
    console.log('Logout button clicked');
  };

  const handleSubmit = async () => {
    const {data} = await axiosInstance.post('/user/addorUpdateUserMonthbyEarning', {
      month: month,
      earning: earning,
      note: note,
      year: year,
    });
    console.log(data);
    //set the state
    setTotalEarning(totalEarning + earning);
    setCurrentMonthEarnings(currentMonthEarnings + earning);
    setCurrentMonthSavings(currentMonthSavings + earning);
    setTotalSavings(totalSavings + earning);
  };
  
  console.log(user);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [earning, setEarning] = useState(0);
  const [note, setNote] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Profile Page</Text>

      <Image
        style={styles.profileImage}
        source={image} // Replace with your profile image source
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      
      <View contentContainerStyle={styles.inputContainer}
      style= {{backgroundColor: '#191A19', width: '100%', padding: 13, borderRadius: 10, marginTop: 15, paddingBottom :18, marginBottom:15,  borderColor: '#fff', borderWidth: 2, marginHorizontal:15
      }}
      >
      <Text style= {{
        fontSize: 18,
        color: '#fff',
        marginBottom: 15,
        fontWeight: 'bold',
        
      }} 
      >Update Current Month Earning Details</Text>
      <Text style={styles.label}>Month:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={month}
        onChangeText={setMonth}
        placeholder="Enter month"
        placeholderTextColor={'#E6E7EE'}
      />

      <Text style={styles.label}>Earning:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={earning}
        onChangeText={setEarning}
        placeholder="Enter earning"
        placeholderTextColor={'#E6E7EE'}
      />

      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Enter details"
        placeholderTextColor={'#E6E7EE'}
      />
      <Button title="Submit"  onPress={handleSubmit} />
    </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.ButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#242B2E',
    color: '#fff',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'flex-start',
    color: '#fff',
  },
  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 75,
    // marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 3,
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
    //marginBottom: 8,
    color: '#fff',
  },
  email: {
    fontSize: 20,
    marginBottom: 15,
    color: '#fff',
  },
  
  logoutButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '80%',
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#fff',
  },
});

export default ProfileComponent;


 