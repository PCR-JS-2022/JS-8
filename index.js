/**
 * Функция находит и добавляет полезную информацию в письма
 * @param {Array<{topic:string, message:string}>} letters 
 */
 function getUsefulInfo(letters) {
   if(!Array.isArray(letters))
    return null
  return letters.map(letter => getUsefulInfoFromOneLetter(letter));
}

/**
 * Функция находит и добавляет полезную информацию в письмо
 * @param {{topic:string, message:string}} letter
 */
function getUsefulInfoFromOneLetter(letter)
{
  let result = []
  const triggerWordPatterns =  [
    [/встреч(а|и)/i, /(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).\d+ ([0-1]\d|2[0-3])(:[0-5]\d)/g, res => res],
    [/компани(я|и)/i, /(АО|ОАО|ООО|ИП|ПАО|НКО|ОП|ЗАО) ".*?"/g, res => res],
    [/автомобил(ь|и)/i,/[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2} \d{2,3}/g, res => res],
    [/оплат(а|ы)/i, /(\d{1,3},?)+(\.\d{1,2})? р\./g, res => Number(res.split(' ')[0].replaceAll(',',''))],
  ]
    for(let [titlePattern, messagePattern, transformFunc] of triggerWordPatterns)
    {
      if(titlePattern.test(letter.topic))
      {
        const searchResult = letter.message.match(messagePattern)?.map(res => transformFunc(res))
        if(searchResult)
          result.push(...searchResult)
      }
    }
    if(result.length === 0)
      result = null
    return {
      topic: letter.topic,
      message: letter.message,
      usefulInfo: result?.length > 1 || !result ? result : result[0],
    }
}

module.exports = {
  getUsefulInfo,
};

