window.onload = () => {
  document.getElementById("bubble-sort").addEventListener("click", () => {
    const sortedArray = bubbleSort([4, 8, 2, 1, 3, 7, 5, 6]);
    const text = document.createTextNode(sortedArray);
    document.getElementById("result").appendChild(text);
  });
};

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }
  return array;
};
