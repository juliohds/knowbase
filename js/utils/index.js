export const waitForMilliseconds = (milliseconds = 3000) => 
    new Promise(resolve => setTimeout(() => resolve(), milliseconds))


