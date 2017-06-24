import arrayToObject from './array-to-object'

describe('array to object', () => {
  it('takes an array of object and returns an object', () => {
    expect(arrayToObject([
      {
        name: 'A', age: 30, food: 'pizza'
      }, {
        name: 'B', age: 40, food: 'pasta'
      }
    ], 'name')).toEqual({
      A: { age: 30, food: 'pizza' },
      B: { age: 40, food: 'pasta' }
    })
  })
})