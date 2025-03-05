import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const CustomCard = ({ title, description, image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={image} // Usando el prop 'image'
          alt={title}   // Usando el prop 'title' como alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{color:"#f00"}}>
            {title}  {/* Usando el prop 'title' */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}  {/* Usando el prop 'description' */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CustomCard;
