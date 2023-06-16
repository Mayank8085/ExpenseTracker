import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../App';

const ProfileComponent = () => {
  const windowHeight = Dimensions.get('window').height;
  //random images from https://picsum.photos/
  const profileuri = 'https://picsum.photos/200/300';
  const {stylesApp} = useAuth();

  return (
    <View style={[stylesApp.App]}>
    <Text style={[styles.heading, stylesApp.PrimaryColor]}>Profile </Text>
    <View style={[styles.container]}>
     

      <Image
        style={styles.profileImage}
        source={{uri:profileuri}} // Replace with your profile image source

      />

      <Text style={[styles.name, stylesApp.SecondaryColor]}>John Doe</Text>
      <Text style={[styles.email, stylesApp.SecondaryColor]}>john.doe@example.com</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Icon name="currency-inr" size={45} color="#5c6bc0" />
          <View >
            <Text style={styles.detailLabel}>Total Spend</Text>
            <Text style={styles.detailValue}> Rs. 500</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="piggy-bank" size={45} color="#66bb6a" />
          <View>
            <Text style={styles.detailLabel}>Total Savings</Text>
            <Text style={styles.detailValue}>Rs. 200</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="credit-card" size={45} color="#ff7043" />
          <View>
            <Text style={styles.detailLabel}>Total Limit</Text>
            <Text style={styles.detailValue}>Rs. 1000</Text>
          </View>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
    paddingLeft: 20,

  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    padding: 15,
    marginTop: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color:'#E6E7EE',
  },
  detailLabel: {
    fontSize: 22,
    marginLeft: 15,
    color:'#E6E7EE',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color:'#E6E7EE',
  },
});

export default ProfileComponent;
