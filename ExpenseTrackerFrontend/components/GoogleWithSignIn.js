import React from 'react';
import {View, StyleSheet} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../App';
import * as Keychain from 'react-native-keychain';

const GoogleWithSignIn = () => {
    const {
        SignIn,
        axiosInstance,
        setAxiosInstance,
        isSignedIn,
        setIsSignedIn,
        user,
        setUser,
    }=useAuth();
    const signin= async () => {
        try{
          const userInfo = await SignIn();
        console.log(userInfo);
        if(!userInfo) return;

        console.log(userInfo.user.email);
        
        //call api
        const {data} = await axiosInstance.post("/auth/loginOrSignup", {
            email: userInfo.user.email,
            name: userInfo.user.name,
            photo: userInfo.user.photo,
            googleId: userInfo.user.id,
        });
        console.log("data");
        console.log(data);
        
        //set axios instance
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${data.token}`;
      

       // console.log(instance)

        setAxiosInstance({axiosInstance})

        //save user data to keychain
        await Keychain.setGenericPassword("user", JSON.stringify(data));

        //set isSignedIn
        setIsSignedIn(true);

        //set user
        setUser(data.user);

        }catch(error){
            console.log(error);
        }

    };
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => {
                    signin();
                }} />
            
        </View>
    );
}

const styles = StyleSheet.create({})

export default GoogleWithSignIn;
