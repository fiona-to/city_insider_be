export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR";

// Create new category
export const CreateCategory = (category) => {
  return (dispatch, getState, { getFirestore }) => {
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
      .catch((error) =>
        dispatch({
          type: ADD_CATEGORY_ERROR,
          payload: error,
        })
      );
  };
};

// Delete an existing category
export const DeleteCategory = (category) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { id } = category;
    firestore
      .collection("category")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: category,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_CATEGORY_ERROR",
          payload: error,
        });
      });
  };
};

// Update / edit an existing category
export const UpdateCategory = (category) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { id, name, vietnamese, enable } = category;
    const refCategory = firestore.collection("category").doc(id);

    refCategory
      .update({
        name,
        vietnamese,
        enable,
      })
      .then(() => {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: category,
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_CATEGORY_ERROR,
          payload: error,
        });
      });
  };
};
