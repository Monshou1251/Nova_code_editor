const algorithmExamples = [
  {
    id: 1,
    name: "BubbleSearch",
    content: `
function bubbleSearch(array, target) {
let left = 0;
let right = array.length - 1;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (array[mid] === target) {
    return mid;
  } else if (array[mid] < target) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

return -1;
}

const sortedArray = [2, 3, 4, 10, 40];
const target = 10;
const result = bubbleSearch(sortedArray, target);
console.log("Element is present at index", result);
`,
  },
  {
    id: 2,
    name: "LinearSearch",
    content: `
function linearSearch(array, target) {
for (let i = 0; i < array.length; i++) {
  if (array[i] === target) {
    return i;
  }
}
return -1;
}

const arr = [10, 20, 80, 30, 60, 50, 110, 100, 130, 170];
const x = 110;
const result = linearSearch(arr, x);
console.log("Element is present at index", result);
`,
  },
  {
    id: 3,
    name: "BinarySearch",
    content: `
function binarySearch(arr, x) {
let start = 0;
let end = arr.length - 1;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === x) return mid;
  else if (arr[mid] < x) start = mid + 1;
  else end = mid - 1;
}

return -1;
}

const arr = [2, 3, 4, 10, 40];
const x = 10;
const result = binarySearch(arr, x);
console.log("Element is present at index", result);
`,
  },
  // Add more algorithm examples here as needed
];

export default algorithmExamples;
