import React, {useContext, useEffect, useCallback} from 'react';
import { View, StatusBar, StyleSheet,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';


//COMPONENT IMPORTS
import Home from './components/Home';
import Profile from './components/Profile';
import Stats from './components/Stats';
import AddExpense from './components/AddExpense';

const AuthContext = React.createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider 
    style={ {flex: 1}}>
   <AuthContext.Provider value={{
    stylesApp: styles,

   }}>
   <NavigationContainer >
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
      </Tab.Navigator>
       
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

