import {validateEmail} from './validate-email';

describe('Helper function: validateEmail', () => {
  it('should return true if the passed e-mail is valid', () => {
    expect(validateEmail('valid@email.com')).toBeTruthy();
    expect(validateEmail('va.l-id@email.com')).toBeTruthy();
  });
  it('should return false if the passed e-mail is not valid', () => {
    expect(validateEmail('invalid.email.com')).toBeFalsy();
    expect(validateEmail('invalid@emailcom')).toBeFalsy();
    expect(validateEmail('login')).toBeFalsy();
  });
});
