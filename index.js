/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new Error('letters не является массивом');
  }
  let lettersCopy = letters.slice();
  const regExps = {
    date: /(0[1-9]|1[0-9]|2[0-9]|3[0-1])[.](0[1-9]|1[0-2])[.]\d{4} (0[0-9]|1[0-9]|2[0-3]):(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])/g,
    company: /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g,
    autoNumber: /[АВЕКМНОРСТУХABEKMHOPCTYX]\d{3}[АВЕКМНОРСТУХABEKMHOPCTYX]{2} \d{2,3}/g,
    money: /(((\d{1,3}[,](\d{3}[,]){0,}\d{3})|(\d{1,}))([.]\d{2})? р[.])/g
  }
  lettersCopy.forEach((elem) => {
    if (elem.topic.match(/встреча/ig)) {
      if (elem.message.match(regExps["date"]) !== null) {
        elem.usefulInfo = elem.message.match(regExps["date"])
      }
      else {
        elem.usefulInfo = null
      }
    }
    else if (elem.topic.match(/компания/ig)) {
      if (elem.message.match(regExps["company"]) !== null) {
        elem.usefulInfo = elem.message.match(regExps["company"])[0]
      }
      else elem.usefulInfo = null
    }
    else if (elem.topic.match(/автомобиль/ig)) {
      if (elem.message.match(regExps["autoNumber"]) !== null) {
        elem.usefulInfo = elem.message.match(regExps["autoNumber"])[0]
      }
      else elem.usefulInfo = null
    }
    else if (elem.topic.match(/оплата/ig)) {
      if (elem.message.match(regExps["money"]) !== null) {
        elem.usefulInfo = Number(elem.message.match(regExps["money"])[0]
            .replaceAll(",","").replaceAll("р.","").replaceAll(" ",""))
      }
      else elem.usefulInfo = null
    }
    else elem.usefulInfo = null;
  });
  return lettersCopy
}

module.exports = {
  getUsefulInfo,
};

