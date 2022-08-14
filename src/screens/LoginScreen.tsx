/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login Incorrecto', errorMessage, [
      {text: 'Ok', onPress: removeError},
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({correo: email, password});
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingresa un correo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            autoCapitalize="none"
            onSubmitEditing={onLogin}
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="**********"
            placeholderTextColor="rgba(255,255,255,0.4)"
            secureTextEntry
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            onSubmitEditing={onLogin}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttomContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
