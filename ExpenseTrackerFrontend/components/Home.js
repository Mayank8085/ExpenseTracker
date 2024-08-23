import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Keychain from 'react-native-keychain';

import {useAuth} from '../App';
import Cards from './Cards';
import Charts from './Charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Home = ({navigation}) => {
  const {
    stylesApp,
    user,
    axiosInstance,
    setAxiosInstance,
    currentMonthEarnings,
    currentMonthSavings,
    currentMonthExpenses,
    setCurrentMonthEarnings,
    setCurrentMonthSavings,
    setCurrentMonthExpenses,
    totalEarning,
    setTotalEarning,
    totalSavings,
    setTotalSavings,
    totalSpend,
    setTotalSpend,

    getTotalSpend,
    getTotalEarning,
    getCurrentMonthSpend,
    getCurrentMonthEarning,

  } = useAuth();
  const windowHeight = Dimensions.get('window').height;
  const [isAddExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const monthName = date.toLocaleString('default', {month: 'long'});

  useEffect(() => {
    //setstates
    const fetchData = async () => {
      try {
        const totalSpends = await getTotalSpend();
        console.log('totalSpends', totalSpends);
        
        setTotalSpend(totalSpends);
        const totalEarnings = await getTotalEarning();
        setTotalEarning(totalEarnings);
        setTotalSavings(totalEarnings - totalSpends);

        const currentMonthSpends = await getCurrentMonthSpend();
        setCurrentMonthExpenses(currentMonthSpends);
        const currentMonthEarning = await getCurrentMonthEarning();
        setCurrentMonthEarnings(currentMonthEarning);
        setCurrentMonthSavings(currentMonthEarning - currentMonthSpends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSaveExpense = async () => {
    // Logic for saving expense amount
    console.log('Save Expense button clicked');
    try {
      const {data} = await axiosInstance.post(
        '/user/addorUpdateUserMonthbyEarning',
        {
          month: month,
          year: year,
          earning: expenseAmount,
        },
      );
      console.log(data);
      console.log('Expense amount:', expenseAmount);
      setCurrentMonthEarnings(data.month.earning);
      setCurrentMonthSavings(data.month.earning - currentMonthExpenses);

      const totalEarnings = await getTotalEarning();

      setTotalEarning(totalEarnings);
      setTotalSavings(totalEarnings - totalSpend);

      setAddExpenseModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={[{height: windowHeight}, stylesApp.App]}>
      <View style={[stylesApp.App, styles.containerColoumn]}>
        {/* profilename and profile pic */}
        <View style={[styles.containerRow]}>
          <MaterialCommunityIcons
            name="account"
            size={40}
            color="#fff"
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
          <Text style={[stylesApp.PrimaryColor, styles.heading]}>
            Hii {user.name} !!
          </Text>
        </View>
        <View style={[styles.containerRow]}>
          <Text
            style={[
              stylesApp.PrimaryColor,
              {
                fontSize: 20,
                paddingTop: 10,
                fontWeight: 'bold',
                paddingLeft: 10,
                fontStyle: 'italic',
              },
            ]}>
            Info for {monthName} Month
          </Text>
        </View>
      </View>
      {/* cards to shows the balance saving and expenses in row which scroll horizontanlly */}
      <View>
        <ScrollView horizontal={true}>
          <View style={[styles.containerRow]}>
            <Cards amount={currentMonthEarnings} type={'Earnings'} />
            <Cards type={'Expenses'} amount={currentMonthExpenses} />
            <Cards type={'Saving'} amount={currentMonthSavings} />
          </View>
        </ScrollView>
      </View>
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
            <Text style={styles.detailText}>
              Total Savings:₹ {totalSavings}
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="credit-card" size={34} color="#ff7043" />
          <View>
            <Text style={styles.detailText}>
              Total Earning: ₹ {totalEarning}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    paddingTop: 5,
    textAlign: 'center',
  },
  containerColoumn: {
    flex: 1,
    height: '100%',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  expenseInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  saveExpenseButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  saveExpenseButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default Home;
