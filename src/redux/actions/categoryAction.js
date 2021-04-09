export const CREATE_CATEGORY = "CREATE_CATEGORY";

export const CreateCategory = (category) => {
  return {
    type: CREATE_CATEGORY,
    payload: category,
  };
};
