'use strict';

function validateTitle(title) {
  if (typeof title !== 'string') {
    return 'Incorrect input data';
  }

  if (title.length < 2 || title.length > 20) {
    return 'INVALID';
  }

  const allowedSymbols = [' ', '!', ':', '-', '?', '.', ','];

  const isValidChars = !title.split('').filter((char, index) => {
    const letterUnicodeNumber = char.codePointAt();
    if (!index) {
      return (letterUnicodeNumber < 65 || letterUnicodeNumber > 90);
    }
    return ((letterUnicodeNumber < 65 || letterUnicodeNumber > 122) && !allowedSymbols.includes(char));
  }).length;

  return isValidChars ? 'VALID' : 'INVALID';
}

validateTitle('Title!');
validateTitle('s');
validateTitle('12title');
validateTitle('Title');
validateTitle(false);
