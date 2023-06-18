import React from 'react';
import {View, StyleSheet} from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../App';

const GoogleWithSignIn = () => {
    const {
        SignIn,
    }=useAuth();
    const signin= async () => {
        try{
            await SignIn();
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
