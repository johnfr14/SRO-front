export const userReducer = (state, action) => {
    switch(action.type) {
      case 'FETCH_INIT':
        return { ...state, loading: true, error: "" }
      case 'FETCH_SUCCESS':
        return { ...state, user: action.payload.user, profile: action.payload.profile, loading: false}
      case 'FETCH_FAILURE':
        return { ...state, loading: false, error: action.payload }
      case 'UPDATE_PROFILE':
        return { ...state, loading: false, profile: action.payload }
      
      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }