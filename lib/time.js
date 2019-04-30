exports.get = function (timeStamp) {
    let date = new Date();
    if (timeStamp) date = new Date(timeStamp);

    let strMonth = date.getMonth() + 1;
    let strDate = date.getDate();
    let strHour = date.getHours();
    let strMin = date.getMinutes();
    let strSec = date.getSeconds();

    if (strMonth >= 1 && strMonth <= 9) strMonth = "0" + strMonth;
    if (strDate >= 0 && strDate <= 9) strDate = "0" + strDate;
    if (strHour >= 0 && strHour <= 9) strHour = "0" + strHour;
    if (strMin >= 0 && strMin <= 9) strMin = "0" + strMin;
    if (strSec >= 0 && strSec <= 9) strSec = "0" + strSec;

    return `${date.getFullYear()}-${strMonth}-${strDate} ${strHour}:${strMin}:${strSec}`;
};