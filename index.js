/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  let lettersCopy = letters.slice();
  const regExps = {
    date: /(0[1-9]|1[0-9]|2[0-2]|3[0-1])[.](0[1-9]|1[0-2])[.]\d{4} (0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])/g,
    company: /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g,
    autoNumber: /[АВЕКМНОРСТУХA-Z]\d{3}[АВЕКМНОРСТУХA-Z]{2} \d{1,3}/g,
    money: /((((?<!(\d))\d{1,3}[,]){1,}\d{3}([.]\d{2})?|(?<!(.))\d{1,}) р[.])/g
  }
  lettersCopy.forEach((elem) => {
    if (elem.topic.match(/Встреча/)) {
      elem.usefulInfo = elem.message.match(regExps["date"])
    }

    if (elem.topic.match(/компания/)) {
      elem.usefulInfo = elem.message.match(regExps["company"])[0]
    }

    if (elem.topic.match(/автомобиль/)) {
      elem.usefulInfo = elem.message.match(regExps["autoNumber"])[0]
    }

    if (elem.topic.match(/оплата/)) {
      elem.usefulInfo = elem.message.match(regExps["money"])[0]
          .replaceAll(",","").replaceAll("р.","").replaceAll(" ","")
    }
  });
  return lettersCopy
}

module.exports = {
  getUsefulInfo,
};

