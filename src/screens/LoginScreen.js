import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../../store/actions/auth';

const heightA = Dimensions.get('window').height;
const widthA = Dimensions.get('window').width;

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [change, setChange] = useState(false);
  const [change2, setChange2] = useState(false);
  const [pass, setPass] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error2, setError2] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const pattern = '^(?=.*[A-Z])+(?=.*[a-z])+(?=.*[0-9])+(?=.*[@#$%&])';
  const patternEmail = '[a-zA-Z0-9]+@gmail.com';

  const signinHandler = async () => {
    setIsLoading(true);

    try {
      await dispatch(authActions.login(email, password));
      props.navigation.navigate('home');
    } catch (err) {
      setError2(err.message);

      Alert.alert('Error', error2, [{text: 'Okay'}]);
    }

    setIsLoading(false);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      AsyncStorage.setItem(
        'userData2',
        JSON.stringify({
          token: userInfo.idToken,
          // userId: userId,
          // expiryDate: expirationDate.toISOString(),
        }),
      );
      props.navigation.navigate('home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '814715201951-q2v92trpoeirijv5fbm3c7k87bmfs8c0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const checkPassword = () => {
    if (password.length < 8) {
      setError('password must be 8 character long');
    } else if (!password.match(pattern)) {
      setError(
        'password must contain one special , uppercase and lowercase char',
      );
    } else {
      setError('');
    }
  };

  const checkEmail = () => {
    if (!email.match(patternEmail)) {
      setErrorEmail('Invalid Email');
    } else {
      setErrorEmail('');
    }
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.root}>
        <View style={styles.leftpop}></View>
        <View style={styles.pop}>
          <Text
            style={{
              color: 'white',
              fontSize: 40,
              position: 'absolute',
              right: '30%',
              bottom: '15%',
            }}>
            Welcome
          </Text>
        </View>

        <View style={styles.log}>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            onTextInput={checkEmail}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              borderColor: 'black',
              borderBottomWidth: 1,
              height: 40,
            }}>
            <TextInput
              secureTextEntry={pass}
              style={styles.input2}
              placeholder="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onTextInput={checkPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setPass(!pass);
              }}>
              <Icon
                name={pass ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: '#E74C3C', marginTop: 5, fontSize: 11}}>
            {error || errorEmail}
          </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={signinHandler}>
            <View style={styles.btn}>
              {isLoading ? (
                <ActivityIndicator size={24} color="white" />
              ) : (
                <Text style={styles.signin}>Sign in</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.google}>
          <Text style={{marginVertical: 10}}>Or</Text>
          <GoogleSigninButton
            style={{width: 200, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        </View>
        <View style={styles.bottomtpop}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              Don't have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('signup');
              }}>
              <Text style={{color: '#E74C3C', fontSize: 12}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: heightA,
    backgroundColor: 'white',
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    height: 50,
    width: '80%',
    marginBottom: 25,
    color: 'black',
  },
  input2: {
    height: 50,
    width: '73%',
    color: 'black',
  },
  log: {
    marginTop: heightA / 3,
    alignItems: 'center',
  },
  pop: {
    position: 'absolute',
    height: 400,
    width: 400,
    backgroundColor: '#1B2631',
    left: -100,
    borderRadius: 200,
    top: -250,
  },
  leftpop: {
    position: 'absolute',
    height: 400,
    width: 400,
    backgroundColor: '#E74C3C',
    right: -100,
    borderRadius: 200,
    top: -200,
  },
  bottomtpop: {
    position: 'absolute',
    height: 250,
    width: widthA + 150,
    backgroundColor: '#1B2631',
    bottom: -180,
    borderTopLeftRadius: 250,
    borderTopRightRadius: 250,
    alignSelf: 'center',
  },
  btn: {
    height: 55,
    width: 200,
    backgroundColor: '#E74C3C',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: 30,
  },
  signin: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  google: {
    alignItems: 'center',
  },
});

export default LoginScreen;
