import { tidyString, capitalizeFirstLetter } from './string-utils'

describe('tidy string', () => {
  it('takes a string returns a tidy string', () => {
    expect(tidyString('string')).toBeDefined()
  })
  // TODO check the JSX returned structure
})

describe('tidy string', () => {
  it('takes undefined returns empty string', () => {
    expect(capitalizeFirstLetter(undefined)).toEqual(undefined)
  })
  it('takes an empty string returns empty string', () => {
    expect(capitalizeFirstLetter('')).toEqual('')
  })
  it('takes a string returns string with first letter capitalized', () => {
    expect(capitalizeFirstLetter('react')).toEqual('React')
  })
})
