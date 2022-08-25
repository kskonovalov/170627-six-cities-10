import {MIN_PASSWORD_LENGTH} from '../const';

export const validatePasswordForLength = (password: string): boolean => password.length >= MIN_PASSWORD_LENGTH;

export const validatePasswordForSymbols = (password: string): boolean => /\d/.test(password) && /[a-zA-Z]/.test(password);
