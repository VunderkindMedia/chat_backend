const { appendFileSync, createWriteStream } = require('fs');


const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

///Обертка над Date с доп. функциями
const ExDate = Date;
ExDate.prototype.getDiffDates = (date1, date2) => {
    return Math.floor((date2 - date1) / 1000);
};
ExDate.prototype.actualDateTime = () => {
  let now = new ExDate();
  let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  let month = now.getMonth()+1 < 10 ? `0${now.getMonth()+1}` : now.getMonth()+1;
  let year = now.getFullYear();
  let hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  let minute = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  let seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

  return `${day}-${month}-${year} ${hour}:${minute}:${seconds}`
}


function CronLogger(){}
CronLogger.prototype.write = (text) => {
  // let stream = createWriteStream("./logs/cron.log");
  // stream.write(`/n${new ExDate().actualDateTime()}: ${text}`);
  // stream.end();
  appendFileSync("./logs/cron.log", `\n${new ExDate().actualDateTime()} - ${text}`)
}

module.exports = {
  isEmpty, ExDate, CronLogger
}
