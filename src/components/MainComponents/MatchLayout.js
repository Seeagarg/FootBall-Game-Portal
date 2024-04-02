import React from "react";
import { Link } from "react-router-dom";
import TimeGoalsComponent from "./TimeGoalsComponent";
import ProgressBar from "./ProgressBar";
import TimeZoneComponent from "./TimeZoneComponent";

const MatchLayout = ({
  key,
  homeTeamLogo,
  homeTeamName,
  awayTeamLogo,
  awayTeamName,
  matchDate,
  matchTime,
  matchTimeZone,
  matchVenue,
  matchLink,
  homeTeamGoals,
  awayTeamGoals,
  matchStatus,
  showProgressBar,
  homeTeamWinPercentage,
  awayTeamWinPercentage,
  drawPercentage,
  matchTimeLive,
  createTeam,
  hideCreateTeam,
  viewTeam
}) => {
  return (
    <div
      key={key}
      className="p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70"
    >
      <Link to={createTeam || hideCreateTeam ? `#` : `/match/${matchLink}`}>
        <div className="flex flex-row justify-around items-center gap-4 max-[700px]:gap-2">
          <div>
            <img
              src={homeTeamLogo}
              className="w-full h-32 object-fit max-[700px]:h-28"
              alt={homeTeamName}
            />
            <h2 className="text-center py-2 w-full">{homeTeamName}</h2>
          </div>
          {matchStatus == "Match Finished" ? (
            <TimeGoalsComponent
              time="FT"
              homeTeamGoals={homeTeamGoals}
              awayTeamGoals={awayTeamGoals}
            />
          ) : matchStatus == "Not Started" ? (
            <div>
              <h1 className="text-center font-extrabold text-6xl">VS</h1>
            </div>
          ) : matchStatus == "Match Postponed" ? (
            <div>
              <h1 className="text-center font-medium text-2xl">
                Match Postponed
              </h1>
            </div>
          ) : (
            <TimeGoalsComponent
              time={matchTimeLive}
              matchStatus={matchStatus}
              matchLive={true}
              homeTeamGoals={homeTeamGoals}
              awayTeamGoals={awayTeamGoals}
            />
          )}
          <div>
            <img
              src={awayTeamLogo}
              className="w-full h-32 object-fit max-[700px]:h-28"
              alt={awayTeamName}
            />
            <h2 className="text-center py-2 w-full">{awayTeamName}</h2>
          </div>
        </div>
      </Link>

      {matchStatus == "Not Started" && showProgressBar ? (
        <div className="w-full py-2 px-6">
          <ProgressBar
            percentage1={homeTeamWinPercentage}
            percentage2={drawPercentage}
            percentage3={awayTeamWinPercentage}
          />
        </div>
      ) : null}

      {matchTimeLive && matchStatus != "Match Finished" ? (
        // Live matches
        <TimeZoneComponent
          notShowTime={true}
          matchStatus={matchStatus}
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          matchVenue={matchVenue}
          createTeam={createTeam}
          createTeamLink={`/match/${matchLink}`}
          hideCreateTeam={hideCreateTeam}
        />
      ) : (
        // Show Time on match finished or match not started
        <TimeZoneComponent
          homeTeamName={homeTeamName}
          awayTeamName={awayTeamName}
          matchStatus={matchStatus}
          matchDate={matchDate}
          matchTime={matchTime}
          matchTimeZone={matchTimeZone}
          matchVenue={matchVenue}
          createTeam={createTeam}
          createTeamLink={`/match/${matchLink}`}
          hideCreateTeam={hideCreateTeam}
          viewTeam={viewTeam}
        />
      )}

      {/* </Link> */}
    </div>
  );
};

export default MatchLayout;
