import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { waitForElement, fireEvent } from '@testing-library/dom'
import { render, unmountComponentAtNode } from 'react-dom'
import React from 'react'

import Ledger from './'

const bill = `type,time,category,amount
0,1561910400001,8s0p77c323,5400
0,1561910400002,0fnhbcle6hg,1500
1,1561910400003,s73ijpispio,30000
`
const categories = `id,type,name
8s0p77c323,0,房贷
0fnhbcle6hg,0,房屋租赁
s73ijpispio,1,工资
`

describe('Ledger', () => {
  let container = null
  beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    container = document.createElement('div')
    document.body.appendChild(container)

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

  afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  async function domReady() {
    await act(async () => {
      render(
        <Router>
          <Ledger />
        </Router>,
        container
      )

      await waitForElement(() => container.querySelector('.app-header'))
    })
  }

  it('should render correctly', async () => {
    await domReady()
    expect(container.querySelector('.app-header-name').textContent).toBe('账单')
  })

  it('type change make categories update', async () => {
    await domReady()

    // before change
    const texts = [].slice
      .call(container.querySelectorAll('#by-category option'))
      .map(e => e.textContent)
    expect(texts.length).toBe(4)

    const byType$ = container.querySelector('#by-type')

    act(() => {
      // mock change event
      fireEvent.change(byType$, {
        target: { value: '1' }
      })
    })

    // event should be works
    expect(byType$.value).toBe('1')

    // and make effect to category select
    const cateTexts = [].slice
      .call(container.querySelectorAll('#by-category option'))
      .map(e => e.textContent)
    expect(cateTexts.length).toEqual(2)
    expect(cateTexts).toContain('工资')
  })
})
