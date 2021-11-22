const calculateAdjustment = (rDiff, sDiff) => {
  
  const rFactor = 1000;
  const k = 30;

  const winExp = 1 / (1 + Math.pow(10, rDiff/rFactor));

  const adjustment = (k * (1-winExp) + (sDiff * (1-winExp)));

  return adjustment.toFixed();
};

export default calculateAdjustment;
