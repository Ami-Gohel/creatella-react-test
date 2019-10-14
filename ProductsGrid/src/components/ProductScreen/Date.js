
//Get date as required format  

let formatedDate = date => {
  const parsedDate = new Date(date);
  //convert time in Micro
  var Minute = 60 * 1000;
  var Hour = Minute * 60;
  var Day = Hour * 24;
  var Week = Day * 7;

  var difference = new Date() - parsedDate;

  if (difference < Minute) {
    var seconds = Math.round(difference / 1000);
    if (seconds == 1) {
      return 'a minute ago';
    }

    return seconds + ' seconds ago';
  } else if (difference < Hour) {
    var minutes = Math.round(difference / Minute);
    if (minutes == 1) {
      return 'a minute ago';
    }

    return minutes + ' minutes ago';
  } else if (difference < Day) {
    var hours = Math.round(difference / Hour);
    if (hours == 1) {
      return 'an hour ago';
    }

    return hours + ' hours ago';
  } else if (difference < Week) {
    var days = Math.round(difference / Day);
    if (days == 7) {
      return 'a week ago';
    }

    return days + ' days ago';
  } else return parsedDate.toDateString();
};

export default formatedDate;
