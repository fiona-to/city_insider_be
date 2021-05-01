export const ADD_NODE_SUCCESS = "ADD_NODE_SUCCESS";
export const ADD_NODE_ERROR = "ADD_NODE_ERROR";
export const UPDATE_NODE_SUCCESS = "UPDATE_NODE_SUCCESS";
export const UPDATE_NOTE_ERROR = "UPDATE_NOTE_ERROR";
export const DELETE_NODE_SUCCESS = "DELETE_NODE_SUCCESS";
export const DELETE_NODE_ERROR = "DELETE_NODE_ERROR";

// Create new Node
export const CreateNode = (node) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("node")
      .add(node)
      .then((data) => {
        const id = data.id;
        dispatch({
          type: ADD_NODE_SUCCESS,
          payload: { id, ...node },
        });
      })
      .catch((error) =>
        dispatch({
          type: ADD_NODE_ERROR,
          payload: error,
        })
      );
  };
};

// Delete an existing node
export const DeleteNode = (node) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const { id } = node;
    firestore
      .collection("node")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_NODE_SUCCESS,
          payload: node,
        });
      })
      .catch((error) => {
        dispatch({
          type: "DELETE_NODE_ERROR",
          payload: error,
        });
      });
  };
};
