const fillArray = (rawData, currentWeek) => {
  // check if params are correct, type checking
  if(!rawData || typeof rawData !== 'object' || typeof currentWeek !== 'number') return 'invalid param data';
  if(!currentWeek || currentWeek < 0) currentWeek = rawData.length;

  // initialise new array to store parsed data
  let newArray = [];

  // push 0 to all needed index
  for (let i = 0; i < currentWeek; i++) {
    newArray.push(0)
  }

  // populate data
  for (let i = 0; i < rawData.length; i++) {
    // destructure current obj
    const { week, hours } = rawData[i]

    // data check
    if(!week || typeof week !== 'number') {
      return `invalid data: ${week}`
    } else if (!hours || typeof hours !== 'number') {
      return `invalid data: ${hours}`
    }
    // add hours worked to correct index
    newArray[week - 1] = hours
  }
  return newArray;
};

// Example simple test case
const source = [
  { week: 1, hours: 17},
  { week: 3, hours: 44 },
  { week: 2, hours: 7 },
];

const result = fillArray(source, 3);
console.group('Set1');
console.log('result ==>', result);
console.log('target ==>', [17, 7, 44]);
console.groupEnd();

// Example more advanced test case
const source1 = [
  { week: 5, hours: 17 },
  { week: 3, hours: 44 },
  { week: 2, hours: 7 },
];

const result1 = fillArray(source1, 8);
console.group('Set2');
console.log('result ==>', result1);
console.log('target ==>', [0, 7, 44, 0, 17, 0, 0, 0]);
console.groupEnd();
