/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
  return letters.map(letter => {
    let usefulInfo = null;

    if (letter.topic.match(/встреча/iu)) {
      const matches = letter.message.match(/(0[1-9]|[12]\d|31)\.(0[1-9]|1[12])\.\d{4}\s([01]\d|2[1-3]):[0-5]\d/g);
      if (matches) {
        usefulInfo = matches;
      }
    }

    if (letter.topic.match(/компания/iu)) {
      const matches = letter.message.match(/[А-Я]+\s"[А-Яа-я\s]+"/u);
      if (matches) {
        usefulInfo = matches[0];
      }
    }

    if (letter.topic.match(/автомобиль/iu)) {
      const matches = letter.message.match(/[АВЕКМНОРСТУХA-Z]\d{3}[АВЕКМНОРСТУХA-Z]{2}\s\d{2,3}/u);
      if (matches) {
        usefulInfo = matches[0];
      }
    }

    if (letter.topic.match(/оплата/iu)) {
      const matches = letter.message.match(/(\s|^)(\d{1,3}(,\d{3})*(.\d{2})?)\sр\./u);
      if (matches) {
        usefulInfo = Number(matches[2].replaceAll(',', ''));
      }
    }

    return { ...letter, usefulInfo };
  });
}

module.exports = {
  getUsefulInfo,
};
