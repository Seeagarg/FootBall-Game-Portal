function SendNotification(homeTeam, awayTeam, matchTime) {
  // Request permission for notifications
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // Create a notification
      new Notification("Football Match", {
        body: `${homeTeam} VS ${awayTeam} at ${matchTime}`,
      });
    } else {
      alert("Match Notifications are blocked !");
    }
  });
}
export default SendNotification;
