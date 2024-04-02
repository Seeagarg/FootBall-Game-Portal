import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import WeeklyMatchesScreen from "./routes/WeeklyMatchesScreen";
import Match from "./routes/Match";
import RecentMatchScreen from "./routes/RecentMatchScreen";
import PlayersScreen from "./routes/PlayersScreen";
import Login from "./routes/Login";
import Standings from "./routes/Standings";
import Signup from "./routes/Signup";
import FantasyTeam from "./routes/FantasyTeam";
import CreateTeam from "./routes/CreateTeam";
import CreatedTeam from "./routes/CreatedTeam";
import UserMatches from "./routes/UserMatches";
import Home2 from "./routes/Home2";
// import Match from './routes/Match'

const App = () => {
  const router = createBrowserRouter([
    {
      index: true,
      path: "/",
      // element: <Home2 />,
      element: <Home />,
    },
    {
      path: "/recent-matches",
      element: <RecentMatchScreen />,
    },
    {
      path: "/weekly-matches",
      element: <WeeklyMatchesScreen />,
    },
    {
      path: "/match/:id/:homeTeamId/:awayTeamId",
      element: <Match />,
    },
    {
      path: "/players",
      element: <PlayersScreen />,
    },
    {
      path: "/standings",
      element: <Standings />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/fantasy-team",
      element: <FantasyTeam />,
    },
    {
      path: "/match/:id/:homeTeamId/:awayTeamId/create-team",
      element: <CreateTeam />,
    },
    {
      path: "/match/:id/:homeTeamId/:awayTeamId/created-team",
      element: <CreatedTeam />,
    },
    {
      path:"/my-matches",
      element:<UserMatches />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
