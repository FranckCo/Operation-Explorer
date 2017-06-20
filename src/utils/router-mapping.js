import React from 'react'


/*
React router doesn't support dot (.) in the URL (it won't load the page if we
access it directly). We translate dots to underscores.
*/
//It will be called when building the URL
export const pointToUnderscore = str => {
  //We throw an error if the original string contains an underscore (safety
  //check).
  if (str.includes('_'))
    throw new Error(
      'Values embedded in the URL cannot contain underscores, error ' +
      `when parsing string ${str}`
    );
  return str.replace('.', '_');
};
//It will be called when extracting props from the URL
export const underscoreToPoint = str => str.replace('_', '.');


export function paramsExtractor(pattern) {
  //build a regular expression to match strings which look like the pattern
  //Attention: parameter values may contain a dots or dashes.
  //We add a $ at the end of the RegExp to ensure that we consume the whole
  //string (if we don't, there might be an error with the pattern)
  const fromRegexp = new RegExp(
    pattern.replace(/:[a-zA-Z_$][a-zA-Z0-9_$]*/g, '([-.a-zA-Z_$$0-9]+)') + '$'
  );
  const names = pattern
    .match(/:[a-zA-Z_$][a-zA-Z0-9_$]*/g)
    .map(name => name.slice(1)) //remove `:` at the beginning of name
  return function extractor(str) {
    let values = fromRegexp.exec(str);
    if (!values)
      throw new Error(
        `Problem while parsing \`${str}\`, expected \`${pattern}\``
      );
    return names.reduce((params, name, i) => {
      //we remove `:` at the beginning of anmes
      params[name] = values[i + 1]
      return params
    }, {})
  }
}

const rId = /:[a-zA-Z_$][a-zA-Z0-9_$]*/;

export function stringBuilder(pattern) {
  //[':firstname', ':lastname']`
  const paramsToIndex = {}
  //regular expression to check if a string looks like a parameter description
  //(for instance ``:firstname`)
  const segments = pattern
    .split(/(:[a-zA-Z_$][a-zA-Z0-9_$]*)/g)
    //There might be some empty strings, if the pattern starts or ends with a
    //parameter, or if there are two consecutive parameters.
    .filter(str => str !== '')
    .map((str, i) => {
      //Keep track of the position of the parameter in the segments
      //Remove `:` at the beginning of the parameter
      if (rId.test(str)) paramsToIndex[str.slice(1)] = i;
      return str;
    });
  return function builder(params) {
    const placeholder = segments.slice()
    Object.keys(paramsToIndex).forEach(key => {
      placeholder[paramsToIndex[key]] = params[key]
    })
    return placeholder.join('')
  }
}

export function URIToURL(from, to) {
  const extractor = paramsExtractor(from)
  const builder = stringBuilder(to)
  return function transform(url) {
    return builder(extractor(url))
  }
}

export function transformProps(routePattern, expected) {
  const extractor = paramsExtractor(routePattern)
  const builders = Object.keys(expected).reduce((builders, key) => {
    builders[key] = stringBuilder(expected[key])
    return builders
  }, {})
  //we could rely on `match.params` for instance, but this version is more
  //generic
  return function transform(route) {
    const params = extractor(route)
    return Object.keys(builders).reduce((newProps, key) => {
      newProps[key] = builders[key](params)
      return newProps
    }, {})
  }
}

export function transformPropsAndWrapComponent(routePattern, expected, cmpnt) {
  const transform = transformProps(routePattern, expected);
  return function WrappedComponent(props) {
    const newProps = transform(props.location.pathname);
    return React.createElement(cmpnt, { ...props, ...newProps })
  }
}

export function processRoute(URIPattern, URLPattern, cmpnt) {
  //the wrapped component will be passed a prop named after the only parameter
  //included in the route pattern.
  const expectedCandidates = URLPattern.match(rId)
  if (expectedCandidates.length > 1) {
    throw new Error('The route pattern should contain only one parameter')
  }
  const expected = expectedCandidates[0].slice(1);
  const WrappedComponent = transformPropsAndWrapComponent(URLPattern, {
    [expected]: URIPattern
  }, cmpnt)
  return {
    WrappedComponent,
    link: URIToURL(URIPattern, URLPattern)
  }
}