export const manualLoopMock = () => {
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

export const timerLoopMock = () => {
  const interval = 1000 / 50; // Not 60, but round number.

  const gameTime = () => {
    return Date.now();
  };

  const scheduler = (fun) => {
    setTimeout(fun, interval);
  };


  return {scheduler, gameTime};
};
