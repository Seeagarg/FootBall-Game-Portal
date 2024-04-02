import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Toolbar, Typography } from "@mui/material";

function EnhancedTableToolbar(props) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
      >
        LeaderBoard
      </Typography>
    </Toolbar>
  );
}

export default function LeaderBoard({ data }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my:2
      }}
    >
      <Paper sx={{ width: "350px", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ maxWidth: 350 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead sx={{background:'black',color:'white'}}>
              <TableRow>
                <TableCell sx={{color:'white' }} align="center">
                  Rank
                </TableCell>
                <TableCell sx={{color:'white' }} align="center">
                  User Number
                </TableCell>
                <TableCell sx={{color:'white'}} align="center">
                  Points
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((dataItem, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ maxWidth: 30 }} align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 30 }} align="center">
                        {dataItem?.user_number}
                      </TableCell>
                      <TableCell sx={{ maxWidth: 30 }} align="center">
                        {dataItem?.total_points}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
