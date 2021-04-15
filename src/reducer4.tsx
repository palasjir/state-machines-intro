import * as React from 'react';
import { useEffect } from 'react';

type Action = {
  type: 'FETCH'
} | {
  type: 'FETCH_SUCCESS'
  data: any
} | {
  type: 'FETCH_ERROR'
}

type State = {
  state: 'NOT_LOADED'
} | {
  state: 'LOADING'
} | {
  state: 'LOADED'
  data: any
} | {
  state: 'ERROR'
  error: string;
}

function Component() {
  const [data, dispatch] = React.useReducer((state: State, action: Action): State => {
    switch (state.state) {
      case 'NOT_LOADED':
        switch (action.type) {
          case 'FETCH':
            return {state: 'LOADING'}
        }
        return state;
      case 'LOADING':
        switch (action.type) {
          case 'FETCH_ERROR':
            return {
              state: 'ERROR',
              error: 'There was an error!'
            }
          case 'FETCH_SUCCESS':
            return {
              state: 'LOADED',
              data: action.data
            }
        }
        return state
      case 'LOADED':
        return state
      case 'ERROR':
        return state
    }
  }, {
    state: 'NOT_LOADED'
  });

  /*
   * Responding to state transitions
   */
  useEffect(() => {
    if(data.state === 'LOADING') {
      fetch('/data')
        .then(() => dispatch({ type: 'FETCH_SUCCESS', data: {} }))
        .catch(() => dispatch({ type: 'FETCH_ERROR' }))
    }
  }, [data.state])

  switch (data.state) {
    case 'NOT_LOADED':
      return (
        <div>
          <button onClick={() => dispatch({type: 'FETCH'})}>Load</button>
        </div>
      );
    case 'LOADING':
      return <div>Loading (spinner)...</div>;
    case 'ERROR':
      return <div>Whoops!</div>
    case 'LOADED':
      return <div>{data}</div>;
  }

}