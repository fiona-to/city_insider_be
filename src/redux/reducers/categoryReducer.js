import { CREATE_CATEGORY } from "../actions/categoryAction";

const initialState = {
  category: [
    { id: 1, name: "Food", vietnamese: "Ăn" },
    { id: 2, name: "Drink", vietnamese: "Uống" },
  ],
};

const CategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CATEGORY:
      return { ...state, payload };
    default:
      return state;
  }
};

export default CategoryReducer;
