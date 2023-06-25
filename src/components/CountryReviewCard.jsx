import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Popover,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import { red, blue, orange, green, yellow } from "@mui/material/colors";
import LoupeIcon from "@mui/icons-material/Loupe";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useAppState } from "../AppState";

const CountryReviewCard = (props) => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileColor = [
    blue[200],
    yellow[200],
    red[200],
    green[200],
    orange[400],
    blue[500],
    yellow[500],
    red[500],
    green[500],
  ];

  const randomNumber = (max) => Math.floor(Math.random() * max);

  const randomBgColor = profileColor[randomNumber(profileColor.length)];

  const cardHeaderAvatar = () => (
    <Avatar sx={{ bgcolor: randomBgColor }} aria-label="country">
      {props.country.name.charAt(0)}
    </Avatar>
  );

  const detailActionButton = () => (
    <Tooltip title="Ver detalhes">
      <IconButton
        aria-describedby={props.country.id}
        variant="contained"
        onClick={handleClick}
      >
        <LoupeIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const editActionButton = () => (
    <Tooltip title="Editar">
      <IconButton
        onClick={() => {
          dispatch({ type: "select", payload: props.country });
          navigate("/home/edit");
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const deleteActionButton = () => (
    <Tooltip title="Deletar">
      <IconButton
        onClick={() => {
          fetch(state.url + "/countries/" + props.country.id, {
            method: "delete",
            headers: {
              Authorization: "bearer " + state.token,
            },
          }).then(() => {
            props.getCountries();
          });
        }}
      >
        <DeleteForever fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const cardHeaderAction = () => (
    <>
      {detailActionButton()}
      {editActionButton()}
      {deleteActionButton()}
    </>
  );

  const cardContentDesc = () => (
    <Typography variant="body2" color="text.secondary">
      {props.country.desc}
    </Typography>
  );

  const popoverDetails = () => (
    <Popover
      id={props.country.id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ margin: 20 }}>
        <Typography>País: {props.country.name}</Typography>
        <Typography>Capital: {props.country.capital_city}</Typography>
        <Typography>Área: {props.country.area_total} km²</Typography>
        <Typography>População: {props.country.population_size}</Typography>
        <Typography>
          Densidade demográfica: {props.country.density} hab/km²
        </Typography>
      </div>
    </Popover>
  );

  const gridItemCard = () => (
    <Grid item margin={2} xs={12} md={6} lg={9}>
      <Card sx={{ width: 350 }}>
        <CardHeader
          avatar={cardHeaderAvatar()}
          action={cardHeaderAction()}
          title={props.country.name}
          subheader={props.country.capital_city}
        />
        <CardContent>
          {cardContentDesc()}
          {popoverDetails()}
        </CardContent>
      </Card>
    </Grid>
  );

  return gridItemCard();
};

export default CountryReviewCard;
