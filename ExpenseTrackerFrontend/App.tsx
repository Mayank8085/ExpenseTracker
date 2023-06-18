import React, {useContext, useEffect, useCallback} from 'react';
import { View, StatusBar, StyleSheet,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';

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
const SignIn = async () => {
  try {
    console.log('Signin');
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    setUser(userInfo.user);
    setIsSignedIn(true);
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '193631796977-kekaduca2ss1l1gndf0ah56imq2qn86k.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices();

  }
  , []);

  return (
    <SafeAreaProvider 
    style={ {flex: 1}}>
   <AuthContext.Provider value={{
    stylesApp: styles,
    isSignedIn: isSignedIn,
    user: user,
    SignIn: SignIn,
    setIsSignedIn: setIsSignedIn,
    setUser: setUser,
    

   }}>
   <NavigationContainer >
    {!isSignedIn &&(
      <Stack.Navigator >
        
      <Stack.Screen
        name="Signin"
        component={GoogleWithSignIn}
        options={{
          headerShown: false,
        }}

        />

      </Stack.Navigator>

    )}
     {isSignedIn && 
       (<Tab.Navigator
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
       <Tab.Screen name="Profile" component={Profile} 
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
     </Tab.Navigator>)}
       
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
    paddingTop: 2 ,
    height: '100%',

  },
  PrimaryColor : {
    color: '#fff',
  },
  SecondaryColor : {
    color: '#E6E7EE',
  },
});
export default App;

