import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch } from "react-redux";
import {
  changeLangToEnglish,
  changeLangToFrench,
  changeLangToSpanish,
  changeLangToArabic
} from "../../slices/langSlice";

const actions = [
  { icon: <img src="/images/england.svg" alt="english" />, name: "English" },
  { icon: <img src="/images/france.svg" alt="france" />, name: "French" },
  { icon: <img src="/images/spain.svg" alt="spain" />, name: "Spanish" },
  { icon: <img src="/images/arab.svg" alt="spain" />, name: "Arabic" },
];

export default function SpeedDialTooltipOpen() {
  const dispatch = useDispatch();

  const changeLanguage = (language) => {
    if (language == "English") {
      dispatch(changeLangToEnglish());
    } else if (language == "French") {
      dispatch(changeLangToFrench());
    } else if(language == "Spanish") {
      dispatch(changeLangToSpanish());
    }
    else{
      dispatch(changeLangToArabic())
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 200,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial ariaLabel="SpeedDial tooltip example" icon={<LanguageIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                {action.icon}
              </div>
            }
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => changeLanguage(action.name)}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Box>
  );
}
