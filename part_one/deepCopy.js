const deepCopy = (sourceObj) => {
  
  // check if sourceobj is obj
  if(!(sourceObj instanceof Object)) return
  
  let newObj = {}

  // loop through each key-val pair in object
  for(let index of Object.entries(sourceObj)) {
    // set key-val to understand easier
    const [key, value] = index

    // else if to only check the value once
    if(value instanceof Date || value instanceof RegExp) {
      // both date & regexp can be converted to primitive string
      newObj[key] = value.toString()
    } else if(value instanceof Array) {
      // init new array and push all array values to it
      let arr = []
      for (const element in value) {
        arr.push(value[element])
      }
      // add array to corresponding key
      newObj[key] = arr
    } else if(value instanceof Function) {
      // function is a type of object so check seperately, set key to it
      newObj[key] = value
    } else if(value instanceof Object) {
      // set key to recursively use our function, creating a new object
      newObj[key] = deepCopy(value)
    } else {
      // set key to primitive value
      newObj[key] = value
    }
  }
  // finally return whole newobj
  return newObj
};

// Example simple test case
const source = {
  a: 1,
  b: 'string',
  c: false,
};

const target = deepCopy(source);
console.group('Set1');
console.log('source ==>', source);
console.log('target ==>', target);
console.groupEnd();

// Example more advanced test case
const source1 = {
  a: [1, 2, 3, 4],
  b: {
    c: 1,
    d: 2,
    e: new Date(),
    f: () => console.log('Hello World'),
    g: new RegExp('ab+c'),
    h: null
  },
};
const target1 = deepCopy(source1);
console.group('Set2');
console.log('source ==>', source1);
console.log('target ===>', target1);
console.groupEnd();

// Feel free to show off different style test cases as you see fit
