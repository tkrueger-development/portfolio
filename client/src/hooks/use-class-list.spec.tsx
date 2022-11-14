import { describe, it, expect } from 'vitest';
import { useClassList } from './use-class-list';

describe('useClassList()', () => {
  it('is defined', () => {
    expect(useClassList).toBeTruthy();
  });

  it('is a function', () => {
    expect(typeof useClassList).equals('function');
  });

  it('returns an array', () => {
    expect( Array.isArray(useClassList()) ).equals(true);
  });

  it('first element of array is a function', () => {
    expect( typeof useClassList()[0] ).equals('function');
  });

  it('second element of array is a function', () => {
    expect( typeof useClassList()[1] ).equals('function');
  });

  it('third element of array is a function', () => {   
    expect( typeof useClassList()[2] ).equals('function');
  });

  describe('getClassList( @string? )', () => {
    it('returns a string', () => {
      const [getClassList] = useClassList();

      expect( typeof getClassList() ).equals('string');
    });

    it('string consists of one or multiple tokens separated by space', () => {
      const [getClassList1] = useClassList('test1');
      const [getClassList2] = useClassList('test1', 'test2');

      const result1 = getClassList1();
      const result2 = getClassList2();

      const tokens1 = result1.split(' ');
      const tokens2 = result2.split(' ');

      expect(tokens1.length).equals(1);
      expect(tokens2.length).equals(2);
    });

    it('returns string given on initialization', () => {
      const expected = 'test1';
      const [getClassList] = useClassList(expected);

      expect( getClassList() ).equals(expected);
    });
  });

  describe('appendClass( @string | @...Array<string> )', () => {
    it('adds string to list', () => {
      const expected = 'test1 test2';
      const [getClassList, appendClass] = useClassList();

      const emptyResult = getClassList();
      expect(emptyResult).equals('');

      appendClass(expected);

      expect( getClassList() ).equals(expected);
    });

    it('accepts multiple parameters', () => {
      const expected1    = 'test1';
      const expected2    = 'test2';
      const expected3    = 'test3';
      const expectedAll  = ['test1', 'test2', 'test3'].join(' ');
      const [getClassList, appendClass] = useClassList();

      appendClass(expected1, expected2, expected3);
      const result = getClassList();

      expect(result).equals(expectedAll);
    });

    it('normalizes input', () => {
      const [getClassList1, appendClass1] = useClassList();
      const [getClassList2, appendClass2] = useClassList();

      appendClass1('test1', 'test2', 'test3');
      const result1 = getClassList1();

      appendClass2('test1 test2 test3');
      const result2 = getClassList2();

      expect(result1).equals('test1 test2 test3');
      expect(result2).equals('test1 test2 test3');
    });
  });

  describe('removeClass( @string )', () => {
    it('removes string from list', () => {
      const initialState = 'test1 test2 test3';
    
      // eslint-disable @typescript-eslint/no-unused-vars
      const [getClassList, _, removeClass] = useClassList(initialState);

      expect(getClassList()).equals(initialState);
      removeClass('test2');
      expect(getClassList()).equals('test1 test3');
    });
  });
});