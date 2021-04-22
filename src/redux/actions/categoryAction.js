export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";

// Create new category
export const CreateCategory = (category) => {
  return (dispatch, getSate, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("category")
      .add(category)
      .then((data) => {
        const id = data.id;
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: { id, ...category },
        });
      })
      .catch((err) =>
        dispatch({
          type: ADD_CATEGORY_ERROR,
          payload: err,
        })
      );
  };
};

// Delete an existing category
export const DeleteCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: category,
    });
  };
};

// Update / edit an existing category
export const UpdateCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: category,
    });
  };
};
