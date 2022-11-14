import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

interface Props {
    labels: any;
}

export default function CheckboxList( {labels}: Props) {
  
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid
      container
      spacing={12}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '10vh', minWidth: '10vw' }}
    >
      <Grid 
        item xs={12}
      >
        <List sx={{ width: '100%', bgcolor: 'background.paper',padding: 0 , position: 'relative', overflow: 'auto', maxHeight: 300,}}>
          {labels.map((value: any) => {
            const labelId = `checkbox-list-label-${value.id}`;

            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Grid>   
    </Grid> 
  );
}
