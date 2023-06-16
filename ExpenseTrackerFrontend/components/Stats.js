import React from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../App';

const ExpenseList = ({expenses}) => {
  const renderItem = ({item}) => (
    <View style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.day}>{item.day}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.amount}>Amount: {item.amount}</Text>
          <Text style={styles.paymentMode}>{item.paymentMode}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Icon name={item.typeIcon} size={20} style={styles.typeIcon} />
          </View>
          <Text style={styles.type}>Type: {item.type}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  expenseItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal:15,
    marginVertical: 14,

  },
  itemContainer: {
    padding: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  day: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    marginRight: 8,
  },
  paymentMode: {
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  typeIcon: {
    color: 'gray',
  },
  type: {
    fontSize: 16,
  },
});

const dummyExpenses = [
  {
    id: 1,
    date: '2023-06-15',
    amount: 50.0,
    day: 'Wednesday',
    type: 'Food',
    typeIcon: 'food',
    paymentMode: 'Cash',
  },
  {
    id: 2,
    date: '2023-06-14',
    amount: 25.0,
    day: 'Tuesday',
    type: 'Transportation',
    typeIcon: 'bus',
  },
  {
    id: 3,
    date: '2023-06-13',
    amount: 10.0,
    day: 'Monday',
    type: 'Entertainment',
    typeIcon: 'gamepad',
  },
  {
    id: 4,
    date: '2023-06-15',
    amount: 50.0,
    day: 'Wednesday',
    type: 'Food',
    typeIcon: 'food',
    paymentMode: 'Cash',
  },
  {
    id: 5,
    date: '2023-06-14',
    amount: 25.0,
    day: 'Tuesday',
    type: 'Transportation',
    typeIcon: 'bus',
  },
  {
    id: 6,
    date: '2023-06-13',
    amount: 10.0,
    day: 'Monday',
    type: 'Entertainment',
    typeIcon: 'gamepad',
  },
  // Add more expense items here...
];
const Stats = () => {
  const {stylesApp} = useAuth();
  return (
    <ScrollView style={[stylesApp.App]}
    nestedScrollEnabled={true}
    
    >
      <View style={[stylesApp.App]}>
        <Text
          style={[
            stylesApp.PrimaryColor,
            {
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 20,
              paddingTop: 5,
              //textAlign: 'center',
             // marginBottom: 30,
              marginTop: 10,
            },
          ]}>
          Stats
        </Text>
        <Text
          style={[
            stylesApp.PrimaryColor,
            {
                fontSize: 20,
                paddingTop: 10,
                fontWeight: 'bold',
                paddingLeft: 20,
                fontStyle: 'italic',
              },
          ]}>
          Info for April Month
        </Text>
        {
            dummyExpenses && dummyExpenses.length > 0 ? (
               
                    <ExpenseList expenses={dummyExpenses} />
                    
            ) : (
                <Text style={[stylesApp.PrimaryColor, {fontSize: 20, fontWeight: 'bold', paddingLeft: 20, fontStyle: 'italic', paddingTop: 10}]}>No expenses found</Text>
            )

        }
        
      </View>
    </ScrollView>
  );
};

export default Stats;
