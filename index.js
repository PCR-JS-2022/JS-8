/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  letters.forEach(letter => {
    let topicLower = letter.topic.toLowerCase();
    letter.usefulInfo = null;
    if (topicLower.includes('встреча')) {
      letter.usefulInfo = letter.message.match(/(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{4}) ([01]\d|2[0-3]):([0-5]\d)/g);
    }
    if (topicLower.includes('компания')) {
      letter.usefulInfo = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/g) ? letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/g)[0] : null;
    }
    if (topicLower.includes('автомобиль')) {
      let carMatch = letter.message.match(/[A-ZАВЕКМНОРСТУХ]\d{3}[A-ZАВЕКМНОРСТУХ]{2} \d{2,3}/g);
      letter.usefulInfo = carMatch ? carMatch[0] : carMatch;
    }
  });

  return letters;
}

module.exports = { getUsefulInfo, };
