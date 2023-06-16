import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAuth} from '../App';
import Cards from './Cards';
import Charts from './Charts';

const Home = ({navigation}) => {
  const {stylesApp} = useAuth();
  const windowHeight = Dimensions.get('window').height;

  return (
    <ScrollView style={[{height: windowHeight}, stylesApp.App]}
    >
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
          <Text
            style={[
              stylesApp.PrimaryColor,
              {
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 20,
                paddingTop: 5,
                textAlign: 'center',
              },
            ]}>
            Hii Mayank !!
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
            Info for April Month
          </Text>
        </View>

        {/* cards to shows the balance saving and expenses in row which scroll horizontanlly */}
        <View>
          <ScrollView horizontal={true}>
            <View style={[styles.containerRow]}>
              <Cards amount={100} type={'Balance'} />
              <Cards type={'Expenses'} amount={70} />
              <Cards type={'Saving'} amount={30} />
            </View>
          </ScrollView>
        </View>

        {/* charts */}
        <View
          style={[
            styles.containerRow,
            {
              //alignContent: 'center',
              //justifyContent: 'center',
              
            },
          ]}>
        
        </View>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerColoumn: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems:'center',
   
    height: '100%',

    //alignContent: 'center',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //alignContent: 'center',
    //justifyContent: 'center',
    //alignItems:'center',
    padding: 10,
  },
});

export default Home;
