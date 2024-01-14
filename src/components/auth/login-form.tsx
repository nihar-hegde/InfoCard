"use client";
// NOTE: we can reuse this form in the /auth/login route or the modal component in the login-button

import { CardWrapper } from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Social Login
    </CardWrapper>
  );
};
