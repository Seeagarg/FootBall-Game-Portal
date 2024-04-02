// const baseUrl='https://goalalert.gameit.in/';
const baseUrl = "http://localhost:5030/";
// const baseUrl='/';
export { baseUrl };

const liveMatchesApi = "api/live-matches"; /* done */
export { liveMatchesApi };

const liveMatchesAllApi = "api/live-matches-all"; /* done */
export { liveMatchesAllApi };

const currentDayMatchesApi = "api/current-matches"; /* done */
export { currentDayMatchesApi };

const recentMatchesApi = "api/recent-matches"; /* done */
export { recentMatchesApi };

const weeklyMatchesApi = "api/weekly-matches"; /* done */
export { weeklyMatchesApi };

const matchByIdApi = "api/match/"; /* done  and no need to pass timezone*/
export { matchByIdApi };

const matchPredictionApi =
  "api/match-prediction/"; /* done and no need to pass timezone */
export { matchPredictionApi };

const teamLineupsApi =
  "api/team-lineups"; /* done and no need to pass timezone*/
export { teamLineupsApi };

const matchesByDateApi = "api/matches-date"; /* done */
export { matchesByDateApi };

const matchStatisticsApi = "api/team-statistics/"; /* done */
export { matchStatisticsApi };

const playerStatisticsApi = "api/player-statistics/"; /* done */
export { playerStatisticsApi };

const playersApi = `api/players/`; /* not using this */
export { playersApi };

const loginApi = `api/login`; /* done */
export { loginApi };

const logoutApi = `api/logout`; /* done */
export { logoutApi };

const standingsApi = "api/standings"; /* done */
export { standingsApi };

const playerTopScoresApi = `api/player-top-scores`; /* done */
export { playerTopScoresApi };

const playerTopAssistsApi = `api/player-top-assists`; /* done */
export { playerTopAssistsApi };

const adminGetMatchesApi = `api/admin/get-matches`; /* done */
export { adminGetMatchesApi };

const fetchPlayersApi = `api/get-team-players`;
export { fetchPlayersApi };

const createUserTeamApi = `api/create-user-team`;
export { createUserTeamApi };

const getUserMatchesApi = `api/get-user-matches`;
export { getUserMatchesApi };

const getUserTeamApi = `api/get-user-team`;
export { getUserTeamApi };

const getMatchLeaderboardApi=`api/get-match-leaderboard`;
export {getMatchLeaderboardApi};

const userTeamPointsLogicApi=`api/user-team-points-logic`;
export {userTeamPointsLogicApi};

// Test Api's

const getMatchesByDateTest=`api/get-matches-by-date-test`;
export {getMatchesByDateTest};