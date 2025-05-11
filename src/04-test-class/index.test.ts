// Uncomment the code below and write your tests
import { isNull } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(initialBalance + 10)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const accountSecond = getBankAccount(initialBalance);
    expect(() => account.transfer(initialBalance + 10, accountSecond)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(initialBalance + 10, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 500;
    const depositAmount = 50;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 500;
    const withdrawAmount = 50;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 500;
    const transferAmount = 50;
    const account = getBankAccount(initialBalance);
    const accountSecond = getBankAccount(initialBalance);
    account.transfer(transferAmount, accountSecond);
    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(accountSecond.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const balance = await account.fetchBalance();
    if (!isNull(balance)) {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const balance = 375;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);
    const balance = null;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
