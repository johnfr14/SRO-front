export const userReducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_INIT':
        return { ...state, loading: true}
      case 'FETCH_SUCCESS':
        return { ...state, data: action.payload, loading: false}
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload }
      case 'UPDATE_PROFILE':
        return { ...state, loading: false, data: action.payload }
      
      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }