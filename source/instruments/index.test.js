import { sum, delay, getUniqueID, getFullApiUrl } from './'

describe('instruments: ', () => {
  test('sum function should be a function', () => {
    expect(sum).toBeInstanceOf(Function);
  })

  test('sum function should throw, when called with non-number type as second argument', () => {
    expect(() => sum(2, 'привет')).toThrow();
  })

  test('sum function should throw, when called with non-number type as first argument', () => {
    expect(() => sum('привет', 2)).toThrow();
  })

  test('sum function should return an addition of two arguments passed', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(1, 8)).toMatchSnapshot();
  })

  test('delay function should return a resolved promise', async () => {
    await expect(delay()).resolves.toBeUndefined();
  })

  test('getUniqueID function should be a function', () => {
    expect(getUniqueID).toBeInstanceOf(Function);
  })

  test('getUniqueID function should throw, when called with non-number type as an argument', () => {
    expect(() => getUniqueID('привет')).toThrow();
  })

  test('getUniqueID function should produce a string of a desired given length', () => {
    expect(typeof getUniqueID()).toBe('string');
    expect(getUniqueID(5)).toHaveLength(5);
    expect(getUniqueID(13)).toHaveLength(13);
    expect(getUniqueID()).toHaveLength(15);
  })

  test('getFullApiUrl function should be a function', () => {
    expect(getFullApiUrl).toBeInstanceOf(Function);
  })

  test('getFullApiUrl function should throw, when called with non-string type as first argument', () => {
    expect(() => getFullApiUrl(42, 'hi')).toThrow();
  })

  test('getFullApiUrl function should throw, when called with non-string type as second argument', () => {
    expect(() => getFullApiUrl('hi', 42)).toThrow();
  })

  test('getFullApiUrl function should produce a concatenated string from its arguments', () => {
    expect(getFullApiUrl('https://lab.lectrum.io/react/api', 'groupId')).toBe('https://lab.lectrum.io/react/api/groupId');
  })
})

