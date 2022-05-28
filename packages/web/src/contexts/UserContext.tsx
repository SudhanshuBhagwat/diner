import { User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { API_BASE_URL } from "../constants";

type AuthActions =
  | { type: "SIGN_IN"; payload: { user: User } }
  | { type: "SIGN_OUT" };

type AuthState =
  | {
      state: "SIGNED_IN";
      currentUser: User;
    }
  | {
      state: "SIGNED_OUT";
    }
  | {
      state: "UNKNOWN";
    };

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        state: "SIGNED_IN",
        currentUser: action.payload.user,
      };
      break;
    case "SIGN_OUT":
      return {
        state: "SIGNED_OUT",
      };
  }
};

type AuthContextProps = {
  state: AuthState;
  dispatch: (value: AuthActions) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  state: { state: "UNKNOWN" },
  dispatch: (val) => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: "UNKNOWN" });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const { state } = useContext(AuthContext);
  return {
    state,
  };
};

async function postUserData(data: any) {
  return fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((result) => {
      return true;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

const useFirebaseAuth = () => {
  const { dispatch } = useContext(AuthContext);

  const signIn = async (user: User) => {
    dispatch({ type: "SIGN_IN", payload: { user } });
    return await postUserData({
      name: user.displayName,
      uid: user.uid,
    });
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return { signIn, signOut };
};

export { useAuthState, useFirebaseAuth, AuthProvider };
