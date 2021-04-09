import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CategoryInputForm from "../components/CategoryInputForm";
import CategoryList from "../components/CategoryList";

// Styling
const useStyles = makeStyles({});

// COMPONENT: Category
const Category = () => {
  const classes = useStyles();
  return (
    <div>
      <CategoryInputForm />
      <CategoryList />
    </div>
  );
};

export default Category;
