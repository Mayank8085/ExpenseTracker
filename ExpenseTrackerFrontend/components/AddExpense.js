import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
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
        <Text style={styles.label}>Amount :</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor={ '#E6E7EE'}
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type :</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          style={[styles.picker, {color: '#fff'}]}
          mode='dropdown'
          
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          placeholder="Type"
          placeholderTextColor={ '#E6E7EE'}
          
        >
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
        <TextInput
          style={styles.input}
          placeholder="Payment Mode"
          value={paymentMode}
          onChangeText={setPaymentMode}
          placeholderTextColor={ '#E6E7EE'}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <Text style={styles.label}>Time :</Text>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
          placeholderTextColor={ '#E6E7EE'}
        />
      </View>
      <View style={[styles.inputContainer, {
          alignItems: 'flex-start',
      }]}>
        <Text style={[styles.label]}>Note :</Text>
        {/* multiline={true} */}
        <TextInput
          style={[styles.muultiline]}
          placeholder="Description"
          placeholderTextColor={ '#E6E7EE'}
          
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
   muultiline: {
    flex: 1,
    height: 100,
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    fontSize:  16,
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
