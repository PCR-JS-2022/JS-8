/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  letters.forEach(letter => {
    if (/встреча/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/((0[1-9]|[12][0-9]|3[01])[.](0[0-9]|1[012])[.](([1-9])([0-9]{3}))\s(([01][0-9]|2[0-3]):[0-5][0-9]$))/gmi);
    } else if (/компания/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(?<![А-ЯЁа-яёA-Za-z0-9])(ИП|ООО|ОАО|АО|ЗАО)\s\".+"/mi)
        ? letter.message.match(/(?<![А-ЯЁа-яёA-Za-z0-9])(ИП|ООО|ОАО|АО|ЗАО)\s\".+"/mi)[0]
        : null;
    } else if (/автомобиль/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(?<![А-ЯЁа-яёA-Za-z0-9])([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2}\s([0-9]{2,3}\b))/gmi)
        ? letter.message.match(/(?<![А-ЯЁа-яёA-Za-z0-9])([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2}\s([0-9]{2,3}\b))/gmi)[0]
        : null;
    } else if (/оплата/gi.exec(letter.topic)) {
      letter.usefulInfo = letter.message.match(/(?!0\.00)((\d{1,3}(,\d{3})*|0|[1-9]\d*)([.]\d{2})?) р\./mi)
        ? parseFloat(letter.message.match(/(?!0\.00)((\d{1,3}(,\d{3})*|0|[1-9]\d*)([.]\d{2})?) р\./mi)[0].trim().replace(/,/g, ''))
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

