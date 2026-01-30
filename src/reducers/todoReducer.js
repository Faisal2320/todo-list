export const TODO_ACTIONS = {
  // Fetch Todos
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_FAILURE",

  // Add Todo
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_FAILURE",

  // Update Todo
  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_FAILURE",

  // Complete Todo
  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_FAILURE",

  // UI Actions
  SET_SORT: "SET_SORT",
  SET_SORT_DIRECTION: "SET_SORT_DIRECTION",
  SET_FILTER: "SET_FILTER",
  SET_FILTER_ERROR: "SET_FILTER_ERROR",

  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FILTER: "RESET_FILTER",
};

export const initialState = {
  todos: [],
  apiError: "",
  isLoading: false,
  sortBy: "createdDate",
  sortDirection: "desc",
  filterTerm: "",
  filterError: "",
  dataVersion: 0,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    //
    //
    //
    // Fetch Todos logic starts here
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isLoading: true,
        apiError: "",
        filterError: "",
      };
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
        apiError: "",
        filterError: "",
      };
    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        apiError: action.payload,
        filterError: "",
      };
    //
    //
    //
    // Add Todo logic starts here
    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        isLoading: true,
        apiError: "",
        filterError: "",
      };
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [...state.todos, action.payload],
        apiError: "",
        filterError: "",
        dataVersion: state.dataVersion + 1,
      };
    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        apiError: action.payload,
        filterError: "",
      };
    //
    //
    //
    // Update Todo logic starts here
    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        isLoading: true,
        todos: state.todos.map((t) => {
          return t.id === action.payload.id ? action.payload : t;
        }),
        apiError: "",
        filterError: "",
      };
    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
        apiError: "",
        filterError: "",
        dataVersion: state.dataVersion + 1,
      };
    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((t) =>
          t.id === action.payload.todo.id ? action.payload.todo : t,
        ),
        apiError: action.payload.error,
        filterError: "",
      };
    // Complete Todo logic starts here
    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        isLoading: true,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, isCompleted: true } : t,
        ),
        apiError: "",
        filterError: "",
      };
    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
        apiError: "",
        filterError: "",
        dataVersion: state.dataVersion + 1,
      };
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      console.log("Complete TODO ERROR payload:", action.payload);
      return {
        ...state,
        isLoading: false,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, isCompleted: false } : t,
        ),
        apiError: action.payload.error,
        filterError: "",
      };
    // UI Actions logic starts here
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
      };
    case TODO_ACTIONS.SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload,
      };
    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        // isLoading: false,
        filterTerm: action.payload,
      };
    case TODO_ACTIONS.RESET_FILTER:
      return {
        ...state,
        filterTerm: "",
        filterError: "",
        sortBy: "createdAt",
        sortDirection: "desc",
      };
    case TODO_ACTIONS.SET_FILTER_ERROR:
      return {
        ...state,
        filterError: action.payload,
      };
    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        apiError: "",
        filterError: "",
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
