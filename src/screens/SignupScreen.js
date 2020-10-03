import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const heightA = Dimensions.get('window').height;
const widthA = Dimensions.get('window').width;

const SignupScreen = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [change, setChange] = useState(false);
  const [change2, setChange2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState(true);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const pattern = '^(?=.*[A-Z])+(?=.*[a-z])+(?=.*[0-9])+(?=.*[@#$%&])';
  const patternEmail = '[a-zA-Z0-9]+@gmail.com';

  const signupHandler = async () => {
    setIsLoading(true);

    try {
      await dispatch(authActions.signup(email, password));
      props.navigation.navigate('home');
    } catch (err) {
      setError2(err.message);

      Alert.alert('Error', error2, [{text: 'Okay'}]);
    }

    setIsLoading(false);
  };

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
        <View style={styles.pop}></View>
        <View
          style={{
            position: 'absolute',
            top: '20%',
            left: 0,
            right: 0,
          }}>
          <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}>
            Create Account
          </Text>
        </View>
        <View style={styles.log}>
          <TextInput
            placeholderTextColor="#D7DBDD"
            style={styles.input}
            placeholder="email"
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
            onTextInput={checkEmail}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              borderColor: 'white',
              borderBottomWidth: 1,
              height: 40,
            }}>
            <TextInput
              placeholderTextColor="#D7DBDD"
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
                color="#F4F6F7"
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: '#F4F6F7', marginTop: 5, fontSize: 11}}>
            {error || errorEmail}
          </Text>

          <TouchableOpacity activeOpacity={0.6} onPress={signupHandler}>
            <View style={styles.btn}>
              {isLoading ? (
                <ActivityIndicator size={24} color="#E74C3C" />
              ) : (
                <Text style={styles.signin}>Sign up</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomtpop}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 12}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('login');
              }}>
              <Text style={{color: '#E74C3C', fontSize: 12}}>Sign in</Text>
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
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 50,
    width: '80%',
    marginBottom: 25,
    color: 'white',
  },
  input2: {
    height: 50,
    width: '73%',
    color: 'white',
  },
  log: {
    marginTop: heightA / 2.5,
    alignItems: 'center',
  },
  pop: {
    position: 'absolute',
    height: 400,
    width: 400,
    backgroundColor: '#1B2631',
    left: -200,
    borderRadius: 200,
    top: -300,
  },
  leftpop: {
    position: 'absolute',
    height: 1000,
    width: 600,
    backgroundColor: '#E74C3C',
    right: -100,
    borderRadius: 200,
    top: -170,
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
    backgroundColor: '#F2F3F4',
    borderRadius: 32,
    justifyContent: 'center',
    marginTop: 30,
  },
  signin: {
    color: '#E74C3C',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default SignupScreen;
