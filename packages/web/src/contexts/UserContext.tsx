import { User } from "firebase/auth";
import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { API_BASE_URL } from "../constants";

interface IUser {
  id: number;
  uid: string;
  name: string;
  email: string;
  role: string;
}

type AuthActions =
  | { type: "SIGN_IN"; payload: { user: IUser } }
  | { type: "SIGN_OUT" };

type AuthState =
  | {
      state: "SIGNED_IN";
      currentUser: IUser;
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
    .then((result) => result.json())
    .then((result) => result.result)
    .catch((error) => {
      throw new Error(error);
    });
}

const useFirebaseAuth = () => {
  const { dispatch } = useContext(AuthContext);

  const signIn = async (user: User) => {
    const result = await postUserData({
      name: user.displayName,
      uid: user.uid,
    });

    dispatch({
      type: "SIGN_IN",
      payload: {
        user: {
          id: Number(result.id),
          name: result.id,
          email: user.email!,
          role: result.role,
          uid: result.uid,
        },
      },
    });
  };

  const signOut = () => {
    dispatch({ type: "SIGN_OUT" });
  };

  return { signIn, signOut };
};

export { useAuthState, useFirebaseAuth, AuthProvider };
