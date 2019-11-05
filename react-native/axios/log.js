import env from '../../env';

export default function () { 
   __DEV__ && env.NETWORK_LOGS && console.log(...arguments) 
}