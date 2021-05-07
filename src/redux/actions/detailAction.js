export const ADD_DETAIL_SUCCESS = "ADD_DETAIL_SUCCESS";
export const ADD_DETAIL_ERROR = "ADD_DETAIL_ERROR";
export const DELETE_DETAIL_SUCCESS = "DELETE_DETAIL_SUCCESS";
export const DELETE_DETAIL_ERROR = "DELETE_DETAIL_ERROR";
export const UPDATE_DETAIL_SUCCESS = "UPDATE_DETAIL_SUCCESS";
export const UPDATE_DETAIL_ERROR = "UPDATE_DETAIL_ERROR";

// Create new Detail
export const CreateDetail = (detail) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("detail")
      .add(detail)
      .then((data) => {
        const id = data.id;
        dispatch({
          type: ADD_DETAIL_SUCCESS,
          payload: { id, ...detail },
        });
      })
      .catch((error) =>
        dispatch({
          type: ADD_DETAIL_ERROR,
          payload: error,
        })
      );
  };
};

// Delete selected Detail
export const DeleteDetail = (detail) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { id } = detail;
    firestore
      .collection("detail")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_DETAIL_SUCCESS,
          payload: detail,
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_DETAIL_ERROR,
          payload: error,
        });
      });
  };
};

// Update / edit an existing detail
export const UpdateDetail = ({ id, payload }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const refDetail = firestore.collection("detail").doc(id);
    refDetail
      .update({ ...payload })
      .then(() => {
        dispatch({
          type: UPDATE_DETAIL_SUCCESS,
          payload: { id },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_DETAIL_ERROR,
          payload: error,
        });
      });
  };
};
