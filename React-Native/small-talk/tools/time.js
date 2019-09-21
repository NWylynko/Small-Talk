export default function time(timestamp) {
    var now = new Date();
    var time = new Date(timestamp);
  
    var difference = now - time
  
    if (difference <= 1000 * 60) { 
      return "~" + Math.trunc(difference/1000) + "s"
    } else if (difference <= 1000 * 60 * 60) {
      return "~" + Math.trunc(difference/1000/60) + "m"
    } else if (difference <= 1000 * 60 * 60 * 24) {
      return "~" + Math.trunc(difference/1000/60/60) + "h"
    } else if (difference <= 1000 * 60 * 60 * 24 * 365) {
      return "~" + Math.trunc(difference/1000/60/60/24) + "d"
    } else {
      return "a really long time ago"
    }
  }