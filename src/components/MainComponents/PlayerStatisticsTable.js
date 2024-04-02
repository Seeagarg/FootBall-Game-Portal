import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function EnhancedTableToolbar({ heading }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%", fontSize: 16, fontWeight: "bolder" }}
        variant="h6"
        component="div"
      >
        {heading}
      </Typography>
    </Toolbar>
  );
}

function PlayerStatisticsTable({ data, heading, cellHeading, showGoals,showAssists }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar heading={heading} />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    // position: "sticky",
                    // left: 0,
                    // backgroundColor: "#f5f5f5",
                    // zIndex: 1,
                    // maxWidth: "150px",
                    fontSize: "16",
                    color: "black",
                    fontWeight: "bolder",
                  }}
                >
                  {cellHeading[0]}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontSize: "16",
                    color: "black",
                    fontWeight: "bolder",
                  }}
                >
                  {cellHeading[1]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.slice(0, 5).map((dataItem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <div className="flex justify-start items-center gap-2">
                        {index + 1}
                        <img
                          src={dataItem?.player?.photo}
                          alt={dataItem?.player?.name}
                          className="w-12 h-12 object-contain"
                        />
                        <div className="flex flex-col gap-2 ml-2 justify-start items-start">
                          {dataItem?.player?.name}
                          <div className="flex flex-row justify-start items-center gap-2">
                            <img
                              src={dataItem?.statistics[0]?.team?.logo}
                              alt={dataItem?.statistics[0]?.team?.name}
                              className="w-8 h-8 object-contain"
                            />
                            {dataItem?.statistics[0]?.team?.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {showGoals
                        ? dataItem?.statistics[0]?.goals?.total
                        : showAssists
                        ? dataItem?.statistics[0]?.goals?.assists
                        : null}
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

export default PlayerStatisticsTable;
