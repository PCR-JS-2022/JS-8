/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters
 */
function getUsefulInfo(letters) {
	if (!Array.isArray(letters)) throw new Error('Некорректный массив писем')

	return letters.map(letter => {
		const lowerTopic = letter.topic.toLowerCase()
		if (lowerTopic.includes('встреча')) {
			const dateRegExp = /(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4} ([01]\d|2[0-3]):([0-5]\d)\b/gm
			return {...letter, usefulInfo: letter.message.match(dateRegExp)}
		}

		if (lowerTopic.includes('компания')) {
			const companyRegExp = /(ИП|ООО|ОАО|АО|ЗАО) "(\\.|[^"\\])*"/m
			const match = letter.message.match(companyRegExp)
			return {...letter, usefulInfo: match ? match[0] : null}
		}

		if (lowerTopic.includes('автомобиль')) {
			const numberRegExp = /([А-ЯA-Z]\d{3}[А-ЯA-Z]{2}) (\d{2,3})\b/m
			const match = letter.message.match(numberRegExp)
			return {...letter, usefulInfo: match ? match[0] : null}
		}

		if (lowerTopic.includes('оплата')) {
			const sumRegExp = /((\d{1,3},)*(\d{1,3})+(\.)*(\d{2})*) р\./m
			const match = letter.message.match(sumRegExp)
			if (!match)
				return {...letter, usefulInfo: null}
			const num = match[0].replace(/( р\.)/g, '')
			const replaced = num.replace(/,/g, '')

			return {...letter, usefulInfo: +replaced}
		}

		return letter
	})
}

module.exports = { getUsefulInfo }

