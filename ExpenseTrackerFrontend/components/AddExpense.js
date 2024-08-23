import React from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useAuth} from '../App';

const AddExpenseComponent = () => {
  const {
    stylesApp,
    axiosInstance,
    currentMonthExpenses,
    setCurrentMonthExpenses,
    currentMonthSavings,
    setCurrentMonthSavings,
    totalSavings,
    setTotalSavings,
    totalSpend,
    setTotalSpend,

    getTotalSpend,
    



  } = useAuth();
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [paymentMode, setPaymentMode] = React.useState('');
  //const [time, setTime] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(true);
  //console.log(" qqq" + " " + date);

  const handleAddExpense = async () => {
    // Pass the expense object to the onAddExpense callback
    //console.log("expense" + " " + expense.date, expense.amount, expense.type, expense.description, expense.paymentMode, expense.time);

    //call api

    const {data} = await axiosInstance.post('/expense/addorUpdateExpense', {
      date: date,
      amount: amount,
      category: type,
      description: description,
      paymentType: paymentMode,
    });

    console.log(data);

    //set the state
    const currentMonthExpense = await getCurrentMonthSpend();
    setCurrentMonthExpenses(currentMonthExpense);
    const currentMonthSaving = totalSpend - currentMonthExpense;
    setCurrentMonthSavings(currentMonthSaving);

    //update total savings
    const totalExpense =await getTotalSpend();
    setTotalSpend(totalExpense);
    const totalSaving = totalEarning - totalExpense;
    setTotalSavings(totalSaving);

    // Clear the input fields`
    setAmount('');
    setType('');
    setDescription('');
    setPaymentMode('');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  return (
    <View style={[stylesApp.App]}>
      <Text
        style={[
          stylesApp.PrimaryColor,
          {
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 20,
            paddingTop: 5,

            marginBottom: 30,
            marginTop: 10,
          },
        ]}>
        Add Expense
      </Text>
      <View style={[stylesApp.App, styles.container]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date:</Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          {/* show selected date */}
          <TextInput style={styles.input}>{date.toDateString()}</TextInput>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount :</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor={'#E6E7EE'}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              style={[styles.picker, {color: '#fff'}]}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
              placeholder="Type"
              placeholderTextColor={'#E6E7EE'}>
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Travel" value="Travel" />
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Others" value="Others" />
            </Picker>

            {/* <TextInput
          style={styles.input}
          placeholder="Type"
          placeholderTextColor={ '#E6E7EE'}
          value={type}
          onChangeText={setType}
        /> */}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Payment Mode :</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={paymentMode}
              style={[styles.picker, {color: '#fff'}]}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setPaymentMode(itemValue)
              }
              placeholder="paymentMode"
              placeholderTextColor={'#E6E7EE'}>
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="UPI" value="UPI" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Card" value="Card" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
        </View>

        <View
          style={[
            styles.inputContainer,
            {
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={[styles.label]}>Note :</Text>
          {/* multiline={true} */}
          <TextInput
            style={[styles.muultiline]}
            placeholder="Description"
            placeholderTextColor={'#E6E7EE'}
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
        </View>
        <Button title="Add Expense" onPress={handleAddExpense} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 80,
    fontSize: 16,
    color: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    borderRadius: 5,
  },
  muultiline: {
    flex: 1,
    height: 100,
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#fff',
    borderRadius: 5,
  },
  pickerContainer: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});

export default AddExpenseComponent;
