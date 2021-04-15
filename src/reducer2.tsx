import * as React from 'react';

type Action = {
  type: 'FETCH'
} | {
  type: 'FETCH_SUCCESS'
  data: any
} | {
  type: 'FETCH_ERROR'
}

/*
 * Explicit state
 */

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
    switch (action.type) {
      case 'FETCH':
        return {
          state: 'LOADING',
        }
      case 'FETCH_SUCCESS':
        return {
          state: 'LOADED',
          data: action.data
        }
      case 'FETCH_ERROR':
        return {
          state: 'ERROR',
          error: 'There was an error!'
        }
    }
  }, {
    state: 'NOT_LOADED'
  });

  switch (data.state) {
    case 'NOT_LOADED':
      return <div>Skeleton</div>
    case 'LOADING':
      return <div>Loading (spinner)...</div>;
    case 'ERROR':
      return <div>Whoops!</div>
    case 'LOADED':
      return <div>{data}</div>;
  }

}