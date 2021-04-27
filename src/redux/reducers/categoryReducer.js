import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_ERROR,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
} from "../actions/categoryAction";

// Init state
const initialState = {
  category: [],
};

const CategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY_SUCCESS:
      return { ...state, category: [...state.category, payload] };

    case ADD_CATEGORY_ERROR:
      console.log("Error adding category: ", payload);
      return state;

    case DELETE_CATEGORY_SUCCESS:
      const delList = state.category.filter((item) => item.id !== payload.id);
      return { ...state, category: delList };

    case DELETE_CATEGORY_ERROR:
      console.log("Error deleting category: ", payload);
      return state;

    case UPDATE_CATEGORY_SUCCESS:
      const updatedIndex = state.category.findIndex(
        (item) => item.id === payload.id
      );
      const updatedList = [
        ...state.category.slice(0, updatedIndex),
        payload,
        ...state.category.slice(updatedIndex + 1),
      ];
      return { ...state, category: updatedList };

    case UPDATE_CATEGORY_ERROR:
      console.log("Error updating category: ", payload);
      return state;

    default:
      return state;
  }
};

export default CategoryReducer;
