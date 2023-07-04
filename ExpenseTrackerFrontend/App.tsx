import React, {useContext, useEffect, useCallback} from 'react';
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
import {BACKEND_URI, GOOGLE_CLIENT_ID} from '@env';
//COMPONENT IMPORTS
import Home from './components/Home';
import Profile from './components/Profile';
import Stats from './components/Stats';
import AddExpense from './components/AddExpense';
import GoogleWithSignIn from './components/GoogleWithSignIn';

//CONTEXT IMPORTS
const AuthContext = React.createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [axiosInst, setAxiosInst] = React.useState({});
  //axios instance
  
  const url = 'http://192.168.1.14:5000';
  let axiosInstance = axios.create({
    timeout: 30000,
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
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

  useEffect(() => {
    async function init() {
      try {
        GoogleSignin.configure({
          webClientId:GOOGLE_CLIENT_ID
        });
        GoogleSignin.hasPlayServices();

        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const userData = JSON.parse(credentials.password);
          setUser(userData.user);
          console.log('userData', userData);
          axiosInstance.defaults.headers[
            'Authorization'
          ] = `Bearer ${userData.token}`;

          setIsSignedIn(true);
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
