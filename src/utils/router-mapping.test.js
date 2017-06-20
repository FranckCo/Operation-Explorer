import React from 'react';
import { mount, shallow } from 'enzyme'

import {
  paramsExtractor, pointToUnderscore, stringBuilder, URIToURL, transformProps,
  transformPropsAndWrapComponent
} from './router-mapping';

/*describe('underscore to point', () => {
  it('removes underscores and replaces them with .', () => {
    expect(pointToUnderscore('hello.world')).toEqual('hello_world')
  });
})*/

describe('params extractor', () => {
  it('returns a function to extract parameters from a string', () => {
    const extractor = paramsExtractor('http://people.com/:firstname/:lastname')
    expect(extractor('http://people.com/john/doe')).toEqual({
      firstname: 'john',
      lastname: 'doe'
    })
  })
})

describe('string builder', () => {
  it('returns a function which replaces params with their value', () => {
    const builder = stringBuilder('http://people.com/:firstname/:lastname')
    expect(builder({ firstname: 'john', lastname: 'doe' })).toEqual(
      'http://people.com/john/doe'
    )
  })
})

describe('URI to URL', () => {
  it('returns a function which take a string and returns a new string', () => {
    const transform = URIToURL(
      'http://people.com/:firstname/:lastname',
      '/someone/:firstname/:lastname')
    expect(transform('http://people.com/john/doe')).toEqual('/someone/john/doe')
  })
})

describe('transform props', () => {
  it('returns a function which builds props from the route', () => {
    const transform = transformProps(
      '/someone/:firstname/:lastname',
      {
        name: 'http://people.com/:firstname/:lastname'
      })
    expect(transform('/someone/john/doe')).toEqual({
      name: 'http://people.com/john/doe'
    })
  })
})

describe('transform props and wrap component', () => {
  it('the wrapped component should have the right props', () => {
    const MyComponent = ({ name }) => <div>{name}</div>
    const WrappedComponent = transformPropsAndWrapComponent(
      '/someone/:firstname/:lastname',
      {
        name: 'http://people.com/:firstname/:lastname'
      },
      MyComponent)
    const wrapper = shallow(<WrappedComponent route="/someone/john/doe" />)
    //expect(wrapped.children().length).toEqual(1)
    // expect(
    //   wrapped.contains(<MyComponent name="http://people.com/john/doe" />))
    //   .toEqual(true)
    expect(wrapper.find(MyComponent).props().name).toEqual('http://people.com/john/doe')
  })
})