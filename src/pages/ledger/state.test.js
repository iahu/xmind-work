import { renderHook, act } from '@testing-library/react-hooks'

import { useBanalce, useBill } from './state'

const bill = `type,time,category,amount
0,1561910400001,8s0p77c323,5400
0,1561910400002,0fnhbcle6hg,1500
0,1561910400003,3tqndrjqgrg,3900
`
const categories = `id,type,name
8s0p77c323,0,房贷
0fnhbcle6hg,0,房屋租赁
3tqndrjqgrg,0,日常饮食
`

describe('useBill', function() {
  beforeEach(() => {
    fetch.resetMocks()
    fetch.mockResponse(req => {
      switch (req.url) {
        case '/bill.csv':
          return Promise.resolve(bill)
        case '/categories.csv':
          return Promise.resolve(categories)
        default:
          return Promise.reject(new Error('bad url'))
      }
    })
  })

  it('should return a Array parse from csv file', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBill())
    await waitForNextUpdate()
    const data = result.current[0]

    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toEqual(3)
  })

  it('should sortBy time', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBill())
    await waitForNextUpdate()
    const data = result.current[0]

    expect(data[0].time).toEqual('1561910400003')
    expect(data[1].time).toEqual('1561910400002')
    expect(data[2].time).toEqual('1561910400001')
  })

  it('should contains a id and categoryName properties', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBill())
    await waitForNextUpdate()
    const data = result.current[0]

    expect(data[0].id).toEqual(2)
    expect(data[0].categoryName).toEqual('日常饮食')
  })
})

describe('useBanalce', function() {
  const bill = [
    { type: 0, amount: 5400 },
    { type: 0, amount: 1500 }
  ]
  it('should return a sum of all amounts by type', function() {
    const { result } = renderHook(() => useBanalce(bill))

    expect(Array.isArray(result.current)).toBeTruthy()
    expect(result.current[0]).toEqual(6900)
  })
})
