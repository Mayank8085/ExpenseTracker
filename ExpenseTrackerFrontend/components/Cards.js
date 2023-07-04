import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//cards to show balance expenses and savings
const Cards = ({
  amount,
  type, //balance, expenses, savings
}) => {
  return (
    <View style={[styles.container]}>
      <MaterialCommunityIcons name={
            type === 'Earnings'
                ? 'wallet-outline'
                : type === 'Expenses'
                ? 'currency-inr'
                : 'piggy-bank'
        }
       size={40} color="#1a1a1a" />
      <Text
        style={[
          {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
            paddingTop: 10,
          },
        ]}>
        {type}
      </Text>
      <Text
        style={[
          {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1d1d1d',
            textAlign: 'center',
            paddingTop: 10,
          },
        ]}>
        ₹ {amount}

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: 125,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    // columnGap: 10,
    //rowGap: 10,
  },
});

export default Cards;
