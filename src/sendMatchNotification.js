import { useEffect } from "react";

function sendMatchNotification(registration,matchTiming,homeTeam,awayTeam) {
    const title = 'Football Match Reminder';
    const body = `${homeTeam} VS ${awayTeam} at ${matchTiming} !`;
    const icon = 'path/to/icon.png';
    const options = { body, icon };
  
    registration.showNotification(title, options);
  }

  export function checkMatchTimeAndSendNotification(registration,matchTiming,homeTeam,awayTeam) {
    // Assuming 'matchTime' is the time of the football match
    console.log(matchTiming,"mt");
    const matchTime = new Date(matchTiming);
  
    const currentTime = new Date();
    const timeDiff = matchTime.getTime() - currentTime.getTime();
    const oneHour = 60 * 60 * 1000; // milliseconds in one hour
  
    if (timeDiff > 0 && timeDiff <= oneHour) {
      sendMatchNotification(registration,matchTiming,homeTeam,awayTeam);
    }
  }

  export function ServiceWorkerRegistration(matchTiming,homeTeam,awayTeam) {
    console.log(matchTiming,"mtttttt")
    useEffect(() => {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
              console.log('Service Worker registered with scope:', registration.scope);
              checkMatchTimeAndSendNotification(registration,matchTiming,homeTeam,awayTeam);
            })
            .catch(error => {
              console.error('Service Worker registration failed:', error);
            });
        });
      }
    }, []);
  }
  