/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  letters.forEach(letter => {
    if (/встреча/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](((20)[0-9]{2})|(2100))\s(([01]?[0-9]|2[0-3]):[0-5][0-9]$)/gmi);
    } else if (/компания/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s\".+?"/) ? letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s\".+?"/)[0].toString() : null;
    } else if (/автомобиль/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([A-ZА-Я]\d{3}[A-ZА-Я]{2}\s([0-9]{2,3}))+(?!\d)/) ? letter.message.match(/([A-ZА-Я]\d{3}[A-ZА-Я]{2}\s([0-9]{2,3}))+(?!\d)/)[0] : null;
    } else if (/оплата/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/([\d\.,\s-]+[\d\.]+)/) ? parseFloat(letter.message.match(/([\d\.,\s-]+[\d\.]+)/)[0].trim().replace(/,/g, '')) : null;
    } else {
      letter.usefulInfo = null;
    }
  });

  return letters;
}


module.exports = {
  getUsefulInfo,
};

