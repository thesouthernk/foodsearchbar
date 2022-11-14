import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface rows {
    rows: Array<object>;
}

export default function BasicTable(rows: rows) {
  return (
    <TableContainer component={Paper} sx={{marginTop: 10 }} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx = {{backgroundColor: '#1776d1'}}>
            <TableCell>Food Item</TableCell>
            <TableCell align="right">Weight&nbsp; (g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Portion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row:any) => (
            <TableRow
              key={row.foodCategory}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.description}

              </TableCell>
              <TableCell align="right">{row.gramWeight}</TableCell>
              <TableCell align="right">{row.fatValue}</TableCell>
              <TableCell align="right">{row.carbohydrateValue}</TableCell>
              <TableCell align="right">{row.proteinValue}</TableCell>
              <TableCell align="right">{row.portion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx = {{backgroundColor: '#1776d1'}}>
            <TableCell align="left">Nutrient</TableCell>
            <TableCell align="right">(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.rows.map((row:any) => (
            row.nutrients.map((nutrient:any) => (
                <TableRow
                    key={row.description}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {nutrient.name}

                    </TableCell>
                    <TableCell align="right">{nutrient.weight}</TableCell>
                    {/* <TableCell align="right">{row.nutrient.nutrientKey.value}</TableCell> */}
                </TableRow>
            ))
            // var keyList = row.nutrients.keys()
            // row.keyList.map((nutrientKey:any) => (
            //     <TableRow
            //     key={row.foodCategory}
            //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            //     >
            //     <TableCell component="th" scope="row">
            //         {row.description}

            //     </TableCell>
            //     <TableCell align="right">{row.nutrient.nutrientKey }</TableCell>
            //     <TableCell align="right">{row.nutrient.nutrientKey.value}</TableCell>
            //     </TableRow>
            // ))
            ))}
            
        </TableBody>
      </Table>
    </TableContainer>
    
  );
}
