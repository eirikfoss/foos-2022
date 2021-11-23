

const shuffleChosen = array => {
    let i = array.length,
      temp,
      rand;

    while (0 !== i) {
      rand = Math.floor(Math.random() * i);
      i -= 1;

      temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
    }

    return array;
  };

  export default shuffleChosen;