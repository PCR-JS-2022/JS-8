/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if(!Array.isArray(letters) || !letters) {
    throw new Error("Некорректные данные");
  }
  letters.forEach(letter => {
    if(letter.topic.match(/встреча/ig)) {
      letter.usefulInfo = letter.message.match(/(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4} ([01]\d|2[0-3]):([0-5]\d)/g);
    }
    if(letter.topic.match(/компания/ig)) {
      letter.usefulInfo = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/) ? letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО) ".+"/)[0] : null;
    }
    if(letter.topic.match(/автомобиль/ig)) {
      const matchCars = letter.message.match(/([АВЕКМНОРСТУХABEKMHOPCTYXA]\d{3}[АВЕКМНОРСТУХABEKMHOPCTYXA]{2}) (\d{2,3})/i);
      letter.usefulInfo = matchCars ? matchCars[0] : matchCars;
    }
    if(letter.topic.match(/оплата/ig)) {
      const matchSum = letter.message.match(/(\d{1,3},)*(\d{3})(\.\d{2})? [рp]\./);
      letter.usefulInfo = matchSum ? parseFloat(matchSum[0].split()[0].replaceAll(",", "")) : matchSum
    }
  });
  return letters;
}

module.exports = {
  getUsefulInfo,
};

