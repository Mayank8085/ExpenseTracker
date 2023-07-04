import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../App';

const ProfileComponent = () => {
  // image from net for testing
  const {SignOut, user, axiosInstance} = useAuth();
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  
  //function to get total spend
  const getTotalSpend = async () => {
    try {
      const res = await axiosInstance.get('/expense/getSumOfAllExpenses/');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //get total earning
  const getTotalEarning = async () => {
    try {
      const res = await axiosInstance.get('/user/sumOfAllMonthEarning/');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };



  const image = {uri: user.photo};
  const handleLogout = () => {
    // Logic for handling logout
    SignOut();
    console.log('Logout button clicked');
  };

  console.log(user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const totalSpend = await getTotalSpend();
        console.log(totalSpend.sum);
        setTotalSpend(totalSpend.sum);
        const totalEarning = await getTotalEarning();
        console.log(totalEarning);
        setTotalEarning(totalEarning);
        setTotalSavings(totalEarning - totalSpend.sum);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Profile Page</Text>

      <Image
        style={styles.profileImage}
        source={image} // Replace with your profile image source
      />

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="currency-usd" size={34} color="#5c6bc0" />
          <View>
            <Text style={styles.detailText}>Total Spend: ₹ {totalSpend}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="piggy-bank" size={34} color="#66bb6a" />
          <View>
            <Text style={styles.detailText}>Total Savings:₹ {totalSavings}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="credit-card" size={34} color="#ff7043" />
          <View>
            <Text style={styles.detailText}>Total Earning: ₹ {totalEarning}</Text>
          </View>
        </View>
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
    width: 150,
    height: 150,
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
    marginBottom: 24,
    color: '#fff',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 28,
    color: '#fff',
    paddingLeft: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    color: '#fff',
  },
  detailText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
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
});

export default ProfileComponent;
