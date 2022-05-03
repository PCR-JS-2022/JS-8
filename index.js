/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  if(!Array.isArray(letters) || !letters) {
    throw new Error("Некорректные данные");
  }

  return letters.map(e => {
    const topic = e.topic;
    const message = e.message;

    if(topic.match(/встреча/i)){
      const sample = /(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(\d{4}) ([01]\d|2[0-3]):([0-5]\d)/g;

      return { topic, message, usefulInfo: message.match(sample) };
    }

    if(topic.match(/компания/i)){
      const sample = /(ИП|ООО|ОАО|АО|ЗАО) ".+"/i;
      const match = message.match(sample);

      return { topic, message, usefulInfo: match ? match[0] : match };
    }

    if(topic.match(/автомобиль/i)){
      // Почему-то данная запись не работает
      //const sample = /(?<quote>[ABCEHKMOPTXYАВЕКМНОРСТУХ])(\d{3})(\k<quote>{2}) \d{2,3}/g;
      // и такая
      //const sample = /([ABCEHKMOPTXYАВЕКМНОРСТУХ])(\d{3})(\1{2}) \d{2,3}/g;
      const sample = /([ABCEHKMOPTXYАВЕКМНОРСТУХ])\d{3}([ABCEHKMOPTXYАВЕКМНОРСТУХ]{2}) \d{2,3}/g;
      const match = message.match(sample);

      return { topic, message, usefulInfo: match ? match[0] : match };
    }

    if(topic.match(/оплата/i)){
      const sample = /(0|[1-9]\d*|[1-9]\d{0,2}(,\d{3})+)\.?(\d{2})? [pр]\./;
      const match = message.match(sample);

      return { topic, message, usefulInfo: match ? parseFloat(match[0].replaceAll(',', '')) : match };
    }

    return { topic, message, usefulInfo: null };
  });
}

module.exports = {
  getUsefulInfo,
};
