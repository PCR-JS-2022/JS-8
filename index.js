/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) return null;

  return letters.map(letter => {
    let usefulInfo = null

    if (letter.topic.match(/встреча/iu)) {
      let date = letter.message.match(/(0[1-9]|[12]\d|3[01])[.](0[1-9]|1[0-2])[.](\d{4})\s([01]\d|2[0-3]):([0-5]\d)\b/gmui)
      if (date) {
        date = Array.from(date)
        if (date.length) usefulInfo = date.map((x) => x)
      }
    }
   
    if (letter.topic.match(/компания/iu)) {
      let company = letter.message.match(/(ИП|ООО|ОАО|АО|ЗАО)\s["].+["]/mui)
      if (company) usefulInfo = company[0]
    }

    if (letter.topic.match(/автомобиль/iu)) {
      let number = letter.message.match(/([АВЕКМНОРСТУХA-Z]\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2})\s\d{2,3}\b/mui)
      if (number) usefulInfo = number[0]
    }

    if (letter.topic.match(/оплата/iu)){
      let sum = letter.message.match(/(([1-9]\d{0,2}(,\d{3})*|0|[1-9]\d*)([.]\d{2})?) р\./u)
      if (sum) usefulInfo = Number(sum[1].replaceAll(',', ''))

      return {...letter, usefulInfo}
    }
    return letter
  })
}

module.exports = {
  getUsefulInfo,
};

