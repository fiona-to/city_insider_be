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
      return { ...state, category: [...state.category, payload] };
    case DELETE_CATEGORY:
      // Todo: Compare real data's ID, not name
      const newList = state.category.filter(
        (item) => item.name !== payload.name
      );
      return { ...state, category: newList };
    case UPDATE_CATEGORY:
      // Todo: Compare real data's ID, not name
      const updatedIndex = state.category.findIndex(
        (item) => (item.name = payload.name)
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
