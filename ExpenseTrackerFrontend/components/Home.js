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

const Home = ({navigation}) => {
  const {stylesApp, user, axiosInstance, setAxiosInstance} = useAuth();
  const windowHeight = Dimensions.get('window').height;
  const [isAddExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [currentMonthEarnings, setCurrentMonthEarnings] = useState(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [currentMonthSavings, setCurrentMonthSavings] = useState(0);
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const monthName = date.toLocaleString('default', {month: 'long'});
  const handleAddExpense = () => {
    // Logic for adding expenses
    console.log('Add Expense button clicked');
    setAddExpenseModalVisible(true);
  };
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
      setAddExpenseModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //call api
    const fetchData = async () => {
      console.log('fetching data' + month + year);
      try {
        let {data} = await axiosInstance.post('/user/getCurrentMonthEarning', {
          month: month,
          year: year,
        });
        console.log('data', data);
        setCurrentMonthEarnings(data.earning);

        //call api
        const response1 = await axiosInstance.post(
          '/expense/getSumOfAllExpensesOfCurrentMonth',
          {
            month: month,
            year: year,
          },
        );

        console.log('data1', response1.data);
        setCurrentMonthExpenses(response1.data.sum);
        setCurrentMonthSavings(data.earning - response1.data.sum);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

        {/* charts */}
        <View
          style={[
            styles.containerRow,
            {
              height: 300,
              //alignContent: 'center',
              //justifyContent: 'center',
            },
          ]}></View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
          <Text style={styles.ButtonText}>Add/Update Earning</Text>
        </TouchableOpacity>
      </View>
      {/* Modal for adding expenses */}

      <Modal
        visible={isAddExpenseModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddExpenseModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Add Earnings</Text>
            <TextInput
              style={styles.expenseInput}
              placeholder="Enter amount"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
              type="number"
            />
            <TouchableOpacity
              style={styles.saveExpenseButton}
              onPress={handleSaveExpense}>
              <Text style={styles.saveExpenseButtonText}>Add/Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isAddExpenseModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddExpenseModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Update Earning</Text>
            <TextInput
              style={styles.expenseInput}
              placeholder="Enter amount"
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
              type="number"
            />
            <TouchableOpacity
              style={styles.saveExpenseButton}
              onPress={handleSaveExpense}>
              <Text style={styles.saveExpenseButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
});

export default Home;
