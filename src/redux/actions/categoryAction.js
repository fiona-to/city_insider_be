export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const CreateCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_CATEGORY,
      payload: category,
    });
  };
};

export const DeleteCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: category,
    });
  };
};

export const UpdateCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: category,
    });
  };
};
