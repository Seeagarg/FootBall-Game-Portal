import * as React from "react";
import PlayerStatisticsTable from "./PlayerStatisticsTable";

function PlayerStandingsByAssists({ topScores }) {
    console.log(topScores,'ts');
  return (
    <PlayerStatisticsTable
      data={topScores}
      cellHeading={["Player", "Assists"]}
      showAssists={true}
      showGoals={false}
      heading="Assists"
    />
  );
}

export default PlayerStandingsByAssists;
