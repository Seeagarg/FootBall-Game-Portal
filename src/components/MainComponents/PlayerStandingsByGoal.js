import * as React from "react";
import PlayerStatisticsTable from "./PlayerStatisticsTable";

function PlayerStandingsByGoal({ topScores }) {
  return (
    <PlayerStatisticsTable
      data={topScores}
      cellHeading={["Player", "Goals"]}
      showGoals={true}
      showAssists={false}
      heading="Goals"
    />
  );
}

export default PlayerStandingsByGoal;
