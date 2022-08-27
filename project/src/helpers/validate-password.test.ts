import {validatePasswordForSymbols, validatePasswordForLength} from './validate-password';

describe('Helper function for validating password', () => {
  it('should return true if the password length is > 2', () => {
    // only numbers
    expect(validatePasswordForSymbols('111')).toBeFalsy();
    // only letters
    expect(validatePasswordForSymbols('aaa')).toBeFalsy();
    // at least 1 number and letter
    expect(validatePasswordForSymbols('1a')).toBeTruthy()
  });
  it('should validate the password length', () => {
    expect(validatePasswordForLength('1')).toBeFalsy();
    expect(validatePasswordForLength('11')).toBeTruthy();
    expect(validatePasswordForLength('111')).toBeTruthy();
  });
});
