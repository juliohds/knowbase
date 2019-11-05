
export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const birthDateValidation = v => {
    let nasc = v.split("/").map(Number);
  
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
  
    if (nasc[2] - year < -18){
      return true
    } else if(nasc[2] - year === -18) {
      if(nasc[1] < month){
        return true
      } else if(nasc[1] === month){
        if(nasc[0] <= day){
          return true
        } else {
          return false
        }
      }else {
        return false
      }    
    } else {
      return false 
    }
}