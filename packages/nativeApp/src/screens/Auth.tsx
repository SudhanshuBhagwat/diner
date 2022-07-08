import React from 'react';
import AuthForm from '@diner/shared/components/AuthForm';
import Screen from '../components/Screen';

function Auth() {
  return (
    <Screen>
      <AuthForm handleGoogleSignIn={() => {}} handleLogin={() => {}} />
    </Screen>
  );
}

export default Auth;
