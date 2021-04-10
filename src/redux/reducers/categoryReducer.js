import { CREATE_CATEGORY } from "../actions/categoryAction";

// Init state
const initialState = {
  category: [
    { id: 1, name: "Food", vietnamese: "Ăn", enable: true },
    { id: 2, name: "Drink", vietnamese: "Uống", enable: true },
  ],
};

const CategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CATEGORY:
      return { ...state, category: [...state.category, payload] };
    default:
      return state;
  }
};

export default CategoryReducer;
