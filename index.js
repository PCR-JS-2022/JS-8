/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
    let arrWithInfo = letters.map((letter) => {
        let usefulInfo = null
        
        if (letter.topic.match(/встреча/i)) {
            let res = letter.message.matchAll(/(?:^|[\s"(`{\['])((?:0[1-9]|[12]\d|3[01])\.(?:0[1-9]|1[0-2])\.\d{4} (?:[01]\d|2[0-3]):[0-5]\d)(?:$|[\s!`";:)}\]'.,])/g)
            res = Array.from(res)
            usefulInfo = res.map((r) => r[1])
        }

        if (letter.topic.match(/компания/i)) {
            let res = letter.message.match(/(?:^|[\s(`{\['])((?:ИП|ООО|ОАО|АО|ЗАО) "[а-яёa-z" ]+")(?:$|[\s!`;:)}\]'.,])/i) 
            if (res) {
                usefulInfo = res[1]
            }
        }

        if (letter.topic.match(/автомобиль/i)) {
            let res = letter.message.match(/(?:^|[\s(`{\['])([А-Яа-яЁёA-Za-z]\d{3}(?<!000)[а-яёa-z]{2} \d{2,3})(?:$|[\s!`;:)}\]'.,])/i)
            if (res) {
                usefulInfo = res[1]
            }
        }
        
        if (letter.topic.match(/оплата/i)) {
            let res = letter.message.match(/(?:^|[\s(`{\['])((?:[1-9]\d{0,2}(?:,\d{3})*|0|[1-9]\d*)(?:\.\d{2})?) р\.(?:$|[\s!`";:)}\]',])/)
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