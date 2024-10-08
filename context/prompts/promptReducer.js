export const promptReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_AI':
      return {
        ...state,
        activeAI: action.payload
      };
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: action.payload
      };
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.payload
      };
    case 'SET_PROMPT_TOKENS':
      return {
        ...state,
        promptTokens: action.payload
      };
    case 'LOAD_PLAN':
      return {
        ...state,
        plan: action.payload
      };
    case 'UPDATE_PLAN_TOKENS':
      return {
        ...state,
        plan: {
          ...state.plan,
          ...action.payload
        }
      };
    case 'SET_RESPONSE_TOKENS':
      return {
        ...state,
        responseTokens: action.payload
      };
    case 'SET_IAS_ALLOWED_TO_ACCESS':
      return {
        ...state,
        iasAllowedToAccess: action.payload
      };
    default:
      return state;
  }
};
