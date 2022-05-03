function findMeetingDate(message) {
  return message.match(
    /(0[1-9]|[1-2][0-9]|3[0-1]).(0[1-9]|1[0-2]).([0-9][0-9][0-9][0-9]) ([0-1][0-9]|2[0-3]):([0-5][0-9])/g
  )
}

function findCompanyName(message) {
  let company = message.match(
    /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g
  )
  return company[0]
}

function findCarPlate(message) {
  let plate = message.match(
    /[АВЕКМНОРСТУХABEKMHOPCTYX][0-9][0-9][0-9][АВЕКМНОРСТУХABEKMHOPCTYX][АВЕКМНОРСТУХABEKMHOPCTYX]( )[0-9][0-9]([0-9]{0,1})/g
  )
  return plate[0]
}

function findPrice(message) {
  let sum = message.match(
    /(([0-9]{1,3},)*([0-9]{1,3})+.*([0-9][0-9])*) р./g
  )
  return sum[0].replace(/ р./g, '').replace(/,/g, '')
}

/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new Error ('Ошибка ввода getUsefulInfo()')
  }

  letters.forEach(letter => {
    if (letter.topic.toLowerCase().indexOf("встреча") != -1) {
      letter.usefulInfo = findMeetingDate(letter.message)
      console.log(letter.usefulInfo)
    }

    if (letter.topic.toLowerCase().indexOf("компания") != -1) {
      letter.usefulInfo = findCompanyName(letter.message)
      console.log(letter.usefulInfo)
    }

    if (letter.topic.toLowerCase().indexOf("автомобиль") != -1) {
      letter.usefulInfo = findCarPlate(letter.message)
      console.log(letter.usefulInfo)
    }

    if (letter.topic.toLowerCase().indexOf("оплата") != -1) {
      letter.usefulInfo = findPrice(letter.message)
      console.log(letter.usefulInfo)
    }

    if (!letter.usefulInfo) {
      letter.usefulInfo = null
    }
  });
  return letters
}

module.exports = {
  getUsefulInfo,
};