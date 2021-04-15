/* eslint-disable @typescript-eslint/no-unused-vars */
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
 * Implicit state
*/
interface State {
  isLoading: boolean;
  data: any | undefined;
  error: string | undefined
}

/* All valid implicit states. */
const initial: State = {
  isLoading: false,
  data: undefined,
  error: undefined
}

const loading: State = {
  isLoading: true,
  data: undefined,
  error: undefined
}

const loaded: State = {
  isLoading: false,
  data: {},
  error: undefined
}

const error: State = {
  isLoading: false,
  data: undefined,
  error: 'Error'
}


function Component() {
  const [data, dispatch] = React.useReducer((state:State, action: Action): State => {
    switch (action.type) {
      case 'FETCH':
        return {
          ...state, isLoading: true
        }
      case 'FETCH_SUCCESS':
        return {
          ...state, isLoading: false, data: action.data
        }
      case 'FETCH_ERROR':
        return {
          ...state, isLoading: false, error: 'There was an error'
        }
    }
  }, {
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  if(!data.isLoading && !data.data && !data.error){
    return <div>Skeleton</div>
  }

  if(data.error) {
    return <div>Whoops!</div>
  }

  if(data.isLoading) {
    return <div>Loading (spinner)...</div>;
  }

  return <div>{data}</div>
}