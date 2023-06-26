import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const AddCountry = () => (
  <>
    <Link to="/home/new">
      <AddIcon sx={{ fontSize: 30 }} />
      <div>Cadastrar país</div>
    </Link>
  </>
);

function Button() {
  return <div>Button</div>;
}

export default Button;
