export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(email)) {
    return 'Email is not valid';
  }

  return null;
};

export const validatePassword = (
  password: string,
  confirmPassword: string,
  isSignUp: boolean,
) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  if (password !== confirmPassword && isSignUp) {
    return 'Password and Confirm password must be equal';
  }

  return null;
};

export const validateTermsAndConditions = (
  isAgree: boolean,
  isSignUp: boolean,
) => {
  if (!isAgree && isSignUp) {
    return 'Please provide agreement on terms and conditions';
  }

  return null;
};
