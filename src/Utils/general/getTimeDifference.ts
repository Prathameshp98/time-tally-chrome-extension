
const getTimeDifference = (
    timestamp1: number, 
    timestamp2 : number
) => {
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(timestamp2 - timestamp1);
  
    // Calculate the number of days, hours, minutes, and seconds
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
  
    const hours = Math.floor((diffInMs % msInDay) / msInHour);
    const minutes = Math.floor((diffInMs % msInHour) / msInMinute);
    const seconds = Math.floor((diffInMs % msInMinute) / msInSecond);

    const timeStr =  hours < 24 ? `
                        ${hours > 0 ? `${hours} hrs,` : ``} 
                        ${minutes ? `${minutes} mins,` : ``}
                        ${`${seconds} secs`}
                    ` : 'a while'
  
    return timeStr;
  }

  export default getTimeDifference;