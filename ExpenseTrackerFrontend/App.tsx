import React, {useContext, useEffect, useCallback,useState} from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

//env import
//import {BACKEND_URI, GOOGLE_CLIENT_ID} from '@env';
//COMPONENT IMPORTS
import Home from './components/Home';
import Profile from './components/Profile';
import Stats from './components/Stats';
import AddExpense from './components/AddExpense';
import GoogleWithSignIn from './components/GoogleWithSignIn';
//import { getCurrentMonthEarning, getCurrentMonthSpend, getTotalEarning, getTotalSpend } from './api';

//CONTEXT IMPORTS
const AuthContext = React.createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = useState({});
  const [axiosInst, setAxiosInst] = useState({});
  const [currentMonthEarnings, setCurrentMonthEarnings] = useState(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0);
  const [currentMonthSavings, setCurrentMonthSavings] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [token, setToken] = useState('');

  //axios instance
  const url ='http://192.168.1.34:5000'; //'https://expensetrackerr-is5m.onrender.com';
  let axiosInstance = axios.create({
    timeout: 30000,
    baseURL: url,
    headers: {
      'Content-Type': 'application/json'
    },
  });


  console.log('axiosInstance', axiosInst);

  //google sign in
  const SignIn = async () => {
    try {
      console.log('Signin');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  };

 // google sign out
  const SignOut = async () => {
    try {

      await GoogleSignin.signOut();
      await Keychain.resetGenericPassword();
      setIsSignedIn(false);
      setUser({});
      axiosInstance.defaults.headers['Authorization']  = '';
      setAxiosInst({axiosInstance});
    } catch (error) {
      console.log(error);
    }
  };

  
const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

//function to get total spend

const getTotalSpend = async () => {
  try {
    const res = await axiosInstance.get('/expense/getSumOfAllExpenses/');
    return res.data.sum;
    
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

//get totol saving using above two functions
const getTotalSaving = async () => {
  try {
    const totalSpend = await getTotalSpend();
    const totalEarning = await getTotalEarning();
    return totalEarning - totalSpend;
  } catch (err) {
    console.log(err);
  }
};

//get current month earning
const getCurrentMonthEarning = async () => {
  try {
    const {data} = await axiosInstance.post('/user/getCurrentMonthEarning', {
      month: month,
      year: year,
    });
    return data?.earning;
  } catch (err) {
    console.log(err);
  }
};

//get current month spend
const getCurrentMonthSpend = async () => {
  try {
    const {data} = await axiosInstance.post(
      '/expense/getSumOfAllExpensesOfCurrentMonth',
      {
        month: month,
        year: year,
      },
    );
    return data?.sum;
  } catch (err) {
    console.log(err);
  }
};

//get current month saving
const getCurrentMonthSaving = async () => {
  try {
    const currentMonthEarning = await getCurrentMonthEarning();
    const currentMonthSpend = await getCurrentMonthSpend();
    return currentMonthEarning - currentMonthSpend;
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    async function init() {
      try {
        GoogleSignin.configure({
          webClientId:'666106029738-mo4v9p6vau2o3hsj09p1aif9u2d15isn.apps.googleusercontent.com'
        });
        GoogleSignin.hasPlayServices();

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const userData = JSON.parse(credentials.password);
          setUser(userData.user);
          //console.log('userData', userData);
          axiosInstance.defaults.headers[
            'Authorization'
          ] = `Bearer ${userData.token}`;
          setIsSignedIn(true);

          // const totalSpends = await getTotalSpend();
          // setTotalSpend(totalSpends);
          // const totalEarnings =await getTotalEarning();
          // setTotalEarning(totalEarnings);
          // setTotalSavings(totalEarning-totalSpends);

          // const currentMonthSpend = await getCurrentMonthSpend();
          // setCurrentMonthExpenses(currentMonthSpend);
          // const currentMonthEarnings = await getCurrentMonthEarning();
          // setCurrentMonthEarnings(currentMonthEarnings);
          // setCurrentMonthSavings(currentMonthEarnings-currentMonthSpend);
        } else {
          setIsSignedIn(false);
        }
        
        setAxiosInst({axiosInstance});
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <AuthContext.Provider
        value={{
          stylesApp: styles,
          isSignedIn: isSignedIn,
          user: user,
          SignIn: SignIn,
          setIsSignedIn: setIsSignedIn,
          setUser: setUser,
          axiosInstance: axiosInst.axiosInstance,
          setAxiosInstance: setAxiosInst,
          SignOut: SignOut,
          currentMonthEarnings: currentMonthEarnings,
          setCurrentMonthEarnings: setCurrentMonthEarnings,
          currentMonthExpenses: currentMonthExpenses,
          setCurrentMonthExpenses: setCurrentMonthExpenses,
          currentMonthSavings: currentMonthSavings,
          setCurrentMonthSavings: setCurrentMonthSavings,
          totalSpend: totalSpend,
          setTotalSpend: setTotalSpend,
          totalSavings: totalSavings,
          setTotalSavings: setTotalSavings,
          totalEarning: totalEarning,
          setTotalEarning: setTotalEarning,

          getTotalSpend: getTotalSpend,
          getTotalEarning: getTotalEarning,
          getTotalSaving: getTotalSaving,
          getCurrentMonthEarning: getCurrentMonthEarning,
          getCurrentMonthSpend: getCurrentMonthSpend,
          getCurrentMonthSaving: getCurrentMonthSaving,

          
        }}>
        <NavigationContainer>
          {!isSignedIn && (
            <Stack.Navigator>
              <Stack.Screen
                name="Signin"
                component={GoogleWithSignIn}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
          {isSignedIn && (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({route}) => ({
                tabBarIcon: ({color, size, focused}) => {
                  if (route.name === 'Home') {
                    return (
                      <View>
                        <Feather
                          name={focused ? 'home' : 'home'}
                          size={size}
                          color={color}
                        />
                      </View>
                    );
                  } else if (route.name === 'Stats') {
                    return (
                      <View>
                        <MaterialCommunityIcons
                          name={focused ? 'chart-bar' : 'chart-bar'}
                          size={size}
                          color={color}
                        />
                      </View>
                    );
                  } else if (route.name === 'AddExpense') {
                    return (
                      <View>
                        <Feather
                          name={focused ? 'plus-circle' : 'plus-circle'}
                          size={size}
                          color={color}
                        />
                      </View>
                    );
                  }
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#CAD5E2',
                tabBarStyle: {
                  backgroundColor: '#0D0D0D',
                  borderTopWidth: 0,
                },
                tabBarHideOnKeyboard: true,

                tabBarPressColor: '#e5e5e5',
              })}>
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="AddExpense" component={AddExpense} />
              <Tab.Screen name="Stats" component={Stats} />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({color, size, focused}) => (
                    <View>
                      <Feather
                        name={focused ? 'user' : 'user'}
                        size={size}
                        color={color}
                      />
                    </View>
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#242B2E',
    color: '#fff',
    paddingTop: 2,
    height: '100%',
  },
  PrimaryColor: {
    color: '#fff',
  },
  SecondaryColor: {
    color: '#E6E7EE',
  },
});
export default App;
