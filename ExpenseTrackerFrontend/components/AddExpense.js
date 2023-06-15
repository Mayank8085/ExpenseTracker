import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../App';

const AddExpenseComponent = ({ onAddExpense }) => {
  const {stylesApp} = useAuth();
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [paymentMode, setPaymentMode] = React.useState('');
  const [time, setTime] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(true);

  const handleAddExpense = () => {
    // Create an expense object
    const expense = {
      date,
      amount,
      type,
      description,
      paymentMode,
      time
    };

    // Pass the expense object to the onAddExpense callback
    onAddExpense(expense);

    // Clear the input fields
    setAmount('');
    setType('');
    setDescription('');
    setPaymentMode('');
    setTime('');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
    

  };

  
  return (
    <View style={[stylesApp.App,]} >
      <Text 
      style={[
        stylesApp.PrimaryColor,
        {
          fontSize: 25,
          fontWeight: 'bold',
          marginLeft: 20,
          paddingTop: 5,
          //textAlign: 'center',
          marginBottom: 30,
          marginTop: 10,
        
        },
      ]}
      >Add Expense</Text>
      <View style={[stylesApp.App,styles.container]}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date:</Text>
        {showDatePicker&&<DateTimePicker
        
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}

            />}
        {/* show selected date */}
        <TextInput style={styles.input}>{date.toDateString()}</TextInput>

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type"
          value={type}
          onChangeText={setType}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Payment Mode:</Text>
        <TextInput
          style={styles.input}
          placeholder="Payment Mode"
          value={paymentMode}
          onChangeText={setPaymentMode}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time:</Text>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        {/* multiline={true} */}
        <TextInput
          style={[styles.input,{height: 100,}]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
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
    height: '100%'
    
  },
  inputContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    width: 80,
    fontSize:  16,
    color: '#fff'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize:  16,
    color: '#fff',
    borderRadius: 5, 
   },
});

export default AddExpenseComponent;
