import AsyncStorage from '@react-native-community/async-storage';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
const NAV = 'NAV';

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0QPXmKaY3_2xS86HdaeP4BkEyypoE3CA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const err = errorData.error.message;
      let msg = 'Something went wrong';
      if (err === 'EMAIL_EXISTS') {
        msg = 'email already exists';
      }

      throw new Error(msg);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0QPXmKaY3_2xS86HdaeP4BkEyypoE3CA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      const err = errorData.error.message;
      let msg = 'Something went wrong';
      if (err === 'EMAIL_NOT_FOUND') {
        msg = 'email not found';
      } else if (err === 'INVALID_PASSWORD') {
        msg = 'invalid password';
      }

      throw new Error(msg);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000,
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};

export const logout = () => {
  AsyncStorage.multiRemove('userData', 'userData2');
};
