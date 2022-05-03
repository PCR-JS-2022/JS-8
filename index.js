function checkInfo(result) {
  if (result) {
    return result[0]
  }
  return null
}

function findMeetingDate(message) {
  let date = message.match(
    /(0[1-9]|[1-2][0-9]|3[0-1]).(0[1-9]|1[0-2]).([0-9][0-9][0-9][0-9]) ([0-1][0-9]|2[0-3]):([0-5][0-9])/g
  )
  return date
}

function findCompanyName(message) {
  let company = message.match(
    /(ИП|ООО|ОАО|АО|ЗАО) ".+"/g
  )
  return checkInfo(company)
}

function findCarPlate(message) {
  let plate = message.match(
    /[АВЕКМНОРСТУХABEKMHOPCTYX][0-9][0-9][0-9][АВЕКМНОРСТУХABEKMHOPCTYX][АВЕКМНОРСТУХABEKMHOPCTYX]( )[0-9][0-9]([0-9]{0,1})/g
  )
  return checkInfo(plate)
}

function findPrice(message) {
  let sum = message.match(
    /(([0-9]{1,3},)*([0-9]{1,3})+.*([0-9][0-9])*) р./g
  )
  if (sum) {
    sum = Number(sum[0].replace(/ р./g, '').replace(/,/g, ''))
  } else {
    sum = null
  }
  return sum
}

/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if (!Array.isArray(letters)) {
    throw new Error('Ошибка ввода getUsefulInfo()')
  }

  letters.forEach(letter => {
    if (typeof letter.message !== 'string') {
      letter.message = ''
    }

    if (letter.topic.toLowerCase().indexOf("встреча") != -1) {

      letter.usefulInfo = findMeetingDate(letter.message)
    }

    if (letter.topic.toLowerCase().indexOf("компания") != -1) {
      letter.usefulInfo = findCompanyName(letter.message)
    }

    if (letter.topic.toLowerCase().indexOf("автомобиль") != -1) {
      letter.usefulInfo = findCarPlate(letter.message)
    }

    if (letter.topic.toLowerCase().indexOf("оплата") != -1) {
      letter.usefulInfo = findPrice(letter.message)
    }
  });
  return letters
}

module.exports = {
  getUsefulInfo,
};