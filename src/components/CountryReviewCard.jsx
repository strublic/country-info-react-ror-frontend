import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue, orange, green, yellow } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Popover, Tooltip } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import LoupeIcon from '@mui/icons-material/Loupe';

export default function CountryReviewCard(props) {
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
    blue[500],
    yellow[500],
    red[500],
    green[500],
  ]

  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  const randomBgColor = ( profileColor[randomNumber(profileColor.length)]);

  return (
    <Grid item  margin={2} xs={12} md={6} lg={9}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: randomBgColor }} aria-label="country">
              {props.country.name.charAt(0)}
            </Avatar>
          }
          action={
            <>
              <Tooltip title="Ver detalhes">
                <IconButton aria-describedby={props.country.id} variant="contained" onClick={handleClick}>
                  <LoupeIcon fontSize="small"/>
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar">
                <IconButton>
                  <Settings fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          }
          title={props.country.name}
          subheader={props.country.capital_city}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Poderia ter uma descrição breve sobre o país
          </Typography>
        </CardContent>
        <Popover
            id={props.country.id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
          <Typography>País: {props.country.name}</Typography>
          <Typography>Capital: {props.country.capital_city}</Typography>
          <Typography>Área: {props.country.area_total}</Typography>
          <Typography>População: {props.country.population_size}</Typography>
          <Typography>Densidade demográfica: Á enviar </Typography>
        </Popover>
      </Card>
    </Grid>
  );
}