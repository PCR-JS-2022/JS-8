"use strict";
/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
  const result = [];
  letters.forEach(letter => {
    const regMeet = /встреч(а|и|у)/i;
    const regCompany = /компани(и|я)/i;
    const regAuto = /автомобил(ь|и)/i;
    const regPay = /оплат(а|ы)/i;

    let copy = {};
    for (let key in letter) {
      copy[key] = letter[key];
    }

    if(regMeet.test(letter.topic)) {
      const regDate = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](\d{4}) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])/g;
      const copy = letter;
      copy.usefulInfo = letter.message.match(regDate);
      result.push(copy);
    } 

    if(regCompany.test(letter.topic)) {
      const regCompany = /(ИП|ООО|ОАО|АО|ЗАО) (["'][a-zа-яё"' ]+["'])/i;
      if(regCompany.exec(letter.message) !== null) {
        copy.usefulInfo = regCompany.exec(letter.message)[0];
      } else {
        copy.usefulInfo = null;
      }
      result.push(copy);
    }

    if(regAuto.test(letter.topic)) {
      const regNum = /[АВЕКМНОРСТУХA-Z]{1}\d{3}(?<!000)[АВЕКМНОРСТУХA-Z]{2} \d{2,3}\b/i;
      if(regNum.exec(letter.message) !== null) {
        copy.usefulInfo = regNum.exec(letter.message)[0];
      } else {
        copy.usefulInfo = null;
      }
      result.push(copy);
    }

    if(regPay.test(letter.topic)) {
      const regPrice = /(([1-9]\d{0,2}(,\d{3})+|[1-9]\d*|0)([.]\d{2})?) р[.]/;
      if(regPrice.exec(letter.message) !== null) {
        let price = regPrice.exec(letter.message)[0];
        price = price.substring(0, price.length - 3);
        let result = '';
        for(let i = 0; i < price.length; i++) {
          if(price[i] !== ',') {
            result += price[i];
          }
        } 
        copy.usefulInfo = Number(result);
      } else {
        copy.usefulInfo = null;
      }
      result.push(copy);
    }
  });
  return result;
}

module.exports = {
  getUsefulInfo,
};

// . любой символ
// ^foo начинается на foo
// foo$ после foo ничего нет
// \d любая цифра
// \s неразрывные пробелы
// \w любая буква латинского алфавита, цифра, _
// [.] просто точка
// [\^] экранирование метасимволов
// [^abc] обратные классы
// a{1,3} содержит а 1, 2 или 3 раза
// a{3} aaa
// + 1 или более повторение элемента перед ним
// * любая строка где есть 0 или более букв, которые перед ним
// ? 0 или 1 символ
// a|b а или b
// (a|b)(c|d) ac подходит, ab нет