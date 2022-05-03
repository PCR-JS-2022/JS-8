/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
    let arrWithInfo = letters.map((letter) => {
        let usefulInfo = null
        
        if (letter.topic.match(/встреча/iu)) {
            let res = letter.message.match(/((0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4} ([01]\d|2[0-3]):([0-5]\d))/gmui)
            if (res) {
                res = Array.from(res)
                if (res.length) {
                    usefulInfo = res.map((r) => r)
                }
            }
        }

        if (letter.topic.match(/компания/iu)) {
            let res = letter.message.match(/((ИП|ООО|ОАО|АО|ЗАО) ".+")/mui)
            if (res) {
                usefulInfo = res[1]
            }
        }

        if (letter.topic.match(/автомобиль/iu)) {
            let res = letter.message.match(/(([А-ЯA-ZЁ]\d{3}(?<!000)[А-ЯA-ZЁ]{2}) (\d{2,3}))\b/mui)
            if (res) {
                usefulInfo = res[1]
            }
        }
        
        if (letter.topic.match(/оплата/iu)) {
            let res = letter.message.match(/(([1-9]\d{0,2}(,\d{3})*|0|[1-9]\d*)(\.\d{2})?) р\./u)
            if (res) {
                usefulInfo = Number(res[1].replaceAll(',', ''))
            }
        }

        return {...letter, usefulInfo}
    })
    return arrWithInfo
}

module.exports = {
    getUsefulInfo,
};