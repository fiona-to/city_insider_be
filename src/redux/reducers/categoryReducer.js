import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../actions/categoryAction";

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
      // Todo: remove fake ID
      const newCat = { id: state.category.length + 1, ...payload };
      return { ...state, category: [...state.category, newCat] };
    case DELETE_CATEGORY:
      // Todo: Compare real data's ID, not name
      const newList = state.category.filter((item) => item.id !== payload.id);
      return { ...state, category: newList };
    case UPDATE_CATEGORY:
      // Todo: Compare real data's ID, not name
      const updatedIndex = state.category.findIndex(
        (item) => item.id === payload.id
      );
      const updatedList = [
        ...state.category.slice(0, updatedIndex),
        payload,
        ...state.category.slice(updatedIndex + 1),
      ];
      return { ...state, category: updatedList };
    default:
      return state;
  }
};

export default CategoryReducer;
