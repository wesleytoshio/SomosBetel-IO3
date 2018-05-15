
/// Rederização de Data e hora//////////////////////////////////////////////

function timeDifference(current: number, previous: number) {
    const milliSecondsPerMinute = 60 * 1000;
    const milliSecondsPerHour = milliSecondsPerMinute * 60;
    const milliSecondsPerDay = milliSecondsPerHour * 24;
    const milliSecondsPerMonth = milliSecondsPerDay * 30;
    const milliSecondsPerYear = milliSecondsPerDay * 365;
  
    const elapsed = current - previous;
  
    if (elapsed < milliSecondsPerMinute / 3) {
      return 'just now'
    }
  
    if (elapsed < milliSecondsPerMinute) {
      return 'less than 1 min'
    } else if (elapsed < milliSecondsPerHour) {
      return Math.round(elapsed / milliSecondsPerMinute) + ' min' // min
    } else if (elapsed < milliSecondsPerDay) {
      return Math.round(elapsed / milliSecondsPerHour) + ' h' // hours
    } else if (elapsed < milliSecondsPerMonth) {
      return Math.round(elapsed / milliSecondsPerDay) + ' d' // days
    } else if (elapsed < milliSecondsPerYear) {
      return Math.round(elapsed / milliSecondsPerMonth) + ' Meses' // mo
    } else {
      return Math.round(elapsed / milliSecondsPerYear) + ' Anos' //years
    }
  }
  
  export function timeDifferenceForDate(date: string) {
    const now = new Date().getTime();
    const updated = new Date(date).getTime();
    return timeDifference(now, updated);
  }
///////////////////////////////////////////////////////////////////////////////////



/// Conversão e Rederização de Idade do usuário//////////////////////////////////////////////

function AgeConverting(current: number, previous: number) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'Menos de 1 min'
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + ' Minutos'
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + ' Horas'
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + ' Dias'
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + ' Meses'
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + ' Anos'
  }
}

export function birthdateConvertingForAge(date: string) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return AgeConverting(now, updated);
}
///////////////////////////////////////////////////////////////////////////////////