import React, { useState, useEffect } from "react";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const TimeZoneComponent = ({
  matchTime,
  matchVenue,
  notShowTime,
  matchStatus,
  homeTeamName,
  awayTeamName,
  createTeam,
  createTeamLink,
  hideCreateTeam,
  viewTeam,
}) => {
  const [localMatchTime, setLocalMatchTime] = useState("");
  const [localMatchDate, setLocalMatchDate] = useState("");
  const [calendarDate, setCalendarDate] = useState("");
  const [calendarTime, setCalendarTime] = useState("");
  const [calendarTimeEnd, setCalendarTimeEnd] = useState("");

  const { lang } = useSelector((state) => state.lang);

  const navigate = useNavigate();

  useEffect(() => {
    if (!notShowTime) {
      const matchDateUTC = new Date(matchTime);
      // console.log(matchDateUTC,"mdutc");
      const options = {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      let dateOnly = "";
      if (lang === "english") {
        dateOnly = matchDateUTC?.toLocaleString("en-US", options);
      } else if (lang === "french") {
        dateOnly = matchDateUTC?.toLocaleString("fr-FR", options);
      } else if (lang === "spanish") {
        dateOnly = matchDateUTC?.toLocaleString("es-ES", options);
      } else {
        dateOnly = matchDateUTC?.toLocaleString("ar-AR", options);
      }
      const timeString = matchDateUTC?.toTimeString();

      const timeConvert = timeString?.replace("GMT+0530", "");

      const todayDate = new Date();

      const isSameDate = (firstDate, secondDate) => {
        return (
          firstDate.getFullYear() === secondDate.getFullYear() &&
          firstDate.getMonth() === secondDate.getMonth() &&
          firstDate.getDate() === secondDate.getDate()
        );
      };

      if (isSameDate(todayDate, matchDateUTC)) {
        setLocalMatchDate("Today");
        setCalendarDate(() => moment(matchDateUTC).format("YYYY-MM-DD"));
      } else {
        setLocalMatchDate(dateOnly);
        setCalendarDate(() => moment(matchDateUTC).format("YYYY-MM-DD"));
      }

      setLocalMatchTime(timeConvert);
      setCalendarTime(() => moment(matchDateUTC).format("HH:mm"));
      const matchTimeEnd = moment(matchDateUTC).add({ hours: 1, minutes: 30 });
      setCalendarTimeEnd(() => matchTimeEnd.format("HH:mm"));
    }
  }, [matchTime, lang]);

  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p className="w-full text-center">
          {!notShowTime && `${localMatchDate} , ${localMatchTime}`}
        </p>
      </div>
      <div>
        <p>
          <span className="font-bold">
            {lang === "english"
              ? "Venue :"
              : lang === "french"
              ? "Lieu :"
              : "Evento :"}
          </span>
          {matchVenue}
        </p>
      </div>
      <div>
        {!notShowTime &&
          matchStatus == "Not Started" &&
          !createTeam &&
          !hideCreateTeam && (
            <AddToCalendarButton
              name={`Football Match : ${homeTeamName} VS ${awayTeamName}`}
              startDate={calendarDate}
              // startTime={calendarTime}
              // endTime={calendarTimeEnd}
              timezone={moment.tz.guess()}
              label={
                lang === "english"
                  ? "Add to Calendar"
                  : lang === "french"
                  ? "Ajouter au calendrier"
                  : lang === "spanish"
                  ? "Añadir al calendario"
                  : "إضافة إلى التقويم"
              }
              options={["Apple", "Google"]}
            ></AddToCalendarButton>
          )}

        {createTeam && (
          <div className="w-full flex justify-center items-center mt-4">
            {user?.token ? (
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => navigate(`${createTeamLink}/create-team`)}
              >
                Create Team
              </button>
            ) : (
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => navigate(`/login?redirect=fantasy-team`)}
              >
                Login to Create Team
              </button>
            )}
          </div>
        )}

        {viewTeam && (
          <div className="w-full flex justify-center items-center mt-4">
            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => navigate(`${createTeamLink}/created-team`)}
            >
              View Team
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneComponent;
