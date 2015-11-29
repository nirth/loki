export const fakeManualLoop = () => {
  let currentGameTime = 0;
  let scheduledFun = null;

  const gameTime = () => {
    return currentGameTime;
  };

  const scheduler = (fun) => {
    scheduledFun = null;
    scheduledFun = fun;
  };

  const nextFrame = () => {
    currentGameTime += 1;
    scheduledFun();
    // scheduledFun = null;
  };

  return {nextFrame, scheduler, gameTime};
};

export const fakeTimerLoop = () => {
  const interval = 1000 / 50; // Not 60, but round number.

  const gameTime = () => {
    return Date.now();
  };

  const scheduler = (fun) => {
    setTimeout(fun, interval);
  };


  return {scheduler, gameTime};
};

export const randomTick = () => 15 + Math.round(Math.random() * 15);
