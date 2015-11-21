/*eslint no-console: 0*/
export const log = (...messages) => {
  if (__ENVIRONMENT__ === 'development') {
    console.log(`[${(new Date()).toISOString()}]`, ...messages);
  }
};

export const info = (...messages) => {
  if (__ENVIRONMENT__ === 'development') {
    console.info(`[${(new Date()).toISOString()}]`, ...messages);
  }
};

export const error = (...messages) => {
  if (__ENVIRONMENT__ === 'development') {
    console.error(`[${(new Date()).toISOString()}]`, ...messages);
  }
};
