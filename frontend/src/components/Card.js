import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ItemCard = (props) => {
  const { item } = props;
  return (
    <Card 
      sx={{
      height: "300px",
      cursor: 'pointer',
      width: "350px",
    }}
    >

      < CardMedia
        image= {item.pictureUrl? item.pictureUrl : ""}
        // alt={item.title}
        sx={{ 
          // width: '50%',
          height: '45%', 
          bgcolor: 'text.disabled', 
          display: 'flex', 
          alignItems: 'start', 
          justifyContent: 'end',
          paddingTop: 0, 
          
        }}
      >
        <Typography
          component={'span'}
          variant="h5"
          color="white"
          bgcolor="primary.main"
          sx={{
              textTransform: "none",
              textAlign: "center",
              borderRadius: "5px",
              paddingLeft: 1,
              paddingRight: 1
          }}
        >
          ${item.price.toFixed(2) || "TBC"}
        </Typography>
      </CardMedia>
      <CardContent
        sx ={{
          height: '40%',
        }}>
        {/* <Typography gutterBottom variant="h5" component="div"> */}
        <Typography
              variant="h6"
              overflow="hidden"
              textOverflow="ellipsis"
              marginBottom={0}
              sx={{
                  textTransform: "none",
                  textAlign: "left",
              }}
          >
          {item.title}
        </Typography>
        <Typography 
          variant="body2"
          overflow="hidden"
          textOverflow="ellipsis"
          color="text.secondary"
          sx={{
              textTransform: "none",
              textAlign: "left",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
          }}
        >
          {item.description} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to order" color="primary" size="small">
          <ShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="add to favorites" size="small">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" size="small">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ItemCard;