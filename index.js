/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
function getUsefulInfo(letters) {
    return letters.map(letter => {
        const lower = letter.topic.toLowerCase()

        if (lower.includes('встреча')) {
            const re = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d (0[1-9]|[1][0-9]|2[0-4])[:]([0-5][0-9])/gm;
            return { ...letter, usefulInfo: letter.message.match(re) };
        }

        if (lower.includes('компания')) {
            const re = /(ИП|ООО|ОАО|АО|ЗАО) "(.*?)"/m;
            return { ...letter, usefulInfo: letter.message.match(re) ? letter.message.match(re)[0] : null };
        }

        if (lower.includes('автомобиль')) {
            const re = /([АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2} [0-9]{2,3})/m;
            return { ...letter, usefulInfo: letter.message.match(re) ? letter.message.match(re)[0] : null };
        }

        if (lower.includes('оплата')) {
            const re = /((\d{1,3},)*(\d{1,3})+(\.)*(\d{2})*) р\./m
            const sum = letter.message.match(re) ? letter.message.match(re)[0] : null
            if(sum){
                return {...letter, usefulInfo: sum.replace(/( р\.)|[,]/gm, '')};
            }
        }

        else {
            return { ...letter, usefulInfo: null };
        }
    })
}

module.exports = {
    getUsefulInfo,
};