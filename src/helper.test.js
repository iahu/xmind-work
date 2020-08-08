import {
  currencyFormter,
  getYearMonth,
  monthAdd,
  monthSubtract,
  padStart,
  timeFormater
} from './helper'

describe('padStart', function() {
  it('should add a 0 before a number while it length less than 2', function() {
    expect(padStart(1)).toEqual('01')
    expect(padStart(9)).toEqual('09')
    expect(padStart(10)).toEqual('10')
    expect(padStart(100)).toEqual('100')
  })
})

describe('timeFormater', function() {
  it('should return a yyyy-mm-dd hh:MM:ss formate string', function() {
    const t = '2020-02-02 02:02:02'
    const ts = +new Date(t)
    expect(timeFormater(ts)).toEqual(t)
  })
})

describe('getYearMonth', function() {
  it('should return a yyyy-mm-dd hh:MM:ss formate string', function() {
    const t = '2020-02-02 02:02:02'
    const ts = +new Date(t)
    expect(getYearMonth(ts)).toEqual('2020-02')
  })
})

describe('monthAdd', function() {
  it('should plus a value to a month value', function() {
    expect(monthAdd('2019-01', 1)).toEqual('2019-02')
    expect(monthAdd('2019-01', 2)).toEqual('2019-03')
    expect(monthAdd('2019-01', 11)).toEqual('2019-12')
    expect(monthAdd('2019-01', 12)).toEqual('2020-01')
    expect(monthAdd('2019-01', 24)).toEqual('2021-01')
    expect(monthAdd('2019-12', 1)).toEqual('2020-01')
  })
})

describe('monthSubtract', function() {
  it('should plus a value to a month value', function() {
    expect(monthSubtract('2019-12', 1)).toEqual('2019-11')
    expect(monthSubtract('2019-12', 2)).toEqual('2019-10')
    expect(monthSubtract('2019-12', 11)).toEqual('2019-01')
    expect(monthSubtract('2019-12', 12)).toEqual('2018-12')
    expect(monthSubtract('2019-12', 24)).toEqual('2017-12')
    expect(monthSubtract('2019-01', 1)).toEqual('2018-12')
  })
})

describe('currencyFormter', function() {
  it('should formate a number', function() {
    expect(currencyFormter(1)).toEqual('1.00')
    expect(currencyFormter(12)).toEqual('12.00')
    expect(currencyFormter(12.3)).toEqual('12.30')
    expect(currencyFormter(12.34)).toEqual('12.34')
    expect(currencyFormter(123)).toEqual('123.00')
    expect(currencyFormter(1234)).toEqual('1,234.00')
    expect(currencyFormter(123456)).toEqual('123,456.00')
    expect(currencyFormter(123456.7)).toEqual('123,456.70')
    expect(currencyFormter(123456.78)).toEqual('123,456.78')
  })
})
