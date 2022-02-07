// Fyller opp en array med 0, og et 1-tall på et tilfeldig sted
// Når 1-tallet forsvinner (i intervaller) fra arrayen, utløser det en funksjon
// Deretter starter den på nytt med ny array og ny random 1-tall

const interval = 500;

const intervalFunction = () => {
  let filledArray = new Array(23).fill(0);
  let randInt = Math.floor(Math.random() * 23);

  filledArray.splice(randInt, 0, 1);

  console.log(filledArray.length);

  const fn = setInterval(() => {
    filledArray.shift();
    console.log(filledArray);
    if (filledArray.includes(1)) console.log("has 1, continue");
    else {
      console.log("Do Something");
      clearInterval(fn);
      intervalFunction();
    }
  }, interval);
};

intervalFunction();
