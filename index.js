/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  letters.forEach(letter => {
    if (/встреча/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(0[1-9]|[12]\d|3[01])[.](0[1-9]|1[0-2])[.](\d{4})\s([01]\d|2[0-3]):([0-5]\d)\b/gmui);
    } else if (/компания/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s["].+["]/mui)
        ? letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s["].+["]/mui)[0]
        : null;
    } else if (/автомобиль/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2})\s\d{2,3}\b/mui)
        ? letter.message.match(/([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2})\s\d{2,3}\b/mui)[0]
        : null;
    } else if (/оплата/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(([1-9]\d{0,2}(,\d{3})*|0|[1-9]\d*)([.]\d{2})?) р\./u)
        ? parseFloat(letter.message.match(/(([1-9]\d{0,2}(,\d{3})*|0|[1-9]\d*)([.]\d{2})?) р\./u)[0].trim().replace(/,/g, ''))
        : null;
    } else {
      letter.usefulInfo = null;
    }
  });

  return letters;
}


module.exports = {
  getUsefulInfo,
};

