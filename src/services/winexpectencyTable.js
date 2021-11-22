/*
function checkWinExpectancy(d) {
    
   
    let wE;

    if (d === 0) {
      wE = 0.5;
    } else if (d < 0 && d >= -25) {
      wE = 0.51;
    } else if (d < -25 && d >= -50) {
      wE = 0.53;
    } else if (d < -50 && d >= -75) {
      wE = 0.54;
    } else if (d < -75 && d >= -100) {
      wE = 0.56;
    } else if (d < -100 && d >= -150) {
      wE = 0.59;
    } else if (d < -150 && d >= -200) {
      wE = 0.61;
    } else if (d < -200 && d >= -250) {
      wE = 0.64;
    } else if (d < -250 && d >= -300) {
      wE = 0.67;
    } else if (d < -300 && d >= -350) {
      wE = 0.69;
    } else if (d < -350 && d >= -400) {
      wE = 0.72;
    } else if (d < -400 && d >= -450) {
      wE = 0.74;
    } else if (d < -450 && d >= -500) {
      wE = 0.76;
    } else if (d < -500 && d >= -600) {
      wE = 0.8;
    } else if (d < -600 && d >= -700) {
      wE = 0.83;
    } else if (d < -700 && d >= -800) {
      wE = 0.86;
    } else if (d < -800 && d >= -900) {
      wE = 0.89;
    } else if (d < -900 && d >= -1000) {
      wE = 0.91;
    } else if (d < -1000 && d >= -1100) {
      wE = 0.93;
    } else if (d < -1100 && d >= -1200) {
      wE = 0.94;
    } else if (d < -1200 && d >= -1300) {
      wE = 0.95;
    } else if (d < -1300 && d >= -1400) {
      wE = 0.96;
    } else if (d < -1400 && d >= -1500) {
      wE = 0.97;
    } else if (d < -1500 && d >= -1600) {
      wE = 0.98;
    } else if (d < -1600) {
      wE = 0.99;
    } else if (d > 0 && d <= 25) {
      wE = 0.49;
    } else if (d > 25 && d <= 50) {
      wE = 0.47;
    } else if (d > 50 && d <= 75) {
      wE = 0.46;
    } else if (d > 75 && d <= 100) {
      wE = 0.44;
    } else if (d > 100 && d <= 150) {
      wE = 0.41;
    } else if (d > 150 && d <= 200) {
      wE = 0.39;
    } else if (d > 200 && d <= 250) {
      wE = 0.36;
    } else if (d > 250 && d <= 300) {
      wE = 0.33;
    } else if (d > 300 && d <= 350) {
      wE = 0.31;
    } else if (d > 350 && d <= 400) {
      wE = 0.28;
    } else if (d > 400 && d <= 450) {
      wE = 0.26;
    } else if (d > 450 && d <= 500) {
      wE = 0.24;
    } else if (d > 500 && d <= 600) {
      wE = 0.2;
    } else if (d > 600 && d <= 700) {
      wE = 0.17;
    } else if (d > 700 && d <= 800) {
      wE = 0.14;
    } else if (d > 800 && d <= 900) {
      wE = 0.11;
    } else if (d > 900 && d <= 1000) {
      wE = 0.09;
    } else if (d > 1000 && d <= 1100) {
      wE = 0.07;
    } else if (d > 1100 && d <= 1200) {
      wE = 0.06;
    } else if (d > 1200 && d <= 1300) {
      wE = 0.05;
    } else if (d > 1300 && d <= 1400) {
      wE = 0.04;
    } else if (d > 1400 && d <= 1500) {
      wE = 0.03;
    } else if (d > 1500 && d <= 1600) {
      wE = 0.02;
    } else if (d > 1600) {
      wE = 0.01;
    }
    return wE;
  }
  
  const k = 40;
  let adjustment = k * (1 - checkWinExpectancy(difference));
  console.log(calculateExpectedScore());
  return adjustment.toFixed();

  */
