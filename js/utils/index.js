/*
   wait for miliseconds, usage: 
    await waitForMilliseconds(5000);
*/
export const waitForMilliseconds = (milliseconds = 3000) => 
    new Promise(resolve => setTimeout(() => resolve(), milliseconds))

    
/*
   Check for null or empty excluding 0
*/
export const isNullOrEmpty = v => 
    v === null || 
    v === undefined || 
    v === false || 
    v === NaN || 
    v === "";


/*
   Creates a uuid
*/
export const uuid4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => 
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);


/*
   Convert degress to radiants
*/
export const degToRad = deg => deg * Math.PI / 180;


/*
    Clamp a value between a min and a max value
*/
export const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;


/*
    Returns the magnitude of a vector
*/
export const magnitude = (x, y) => Math.sqrt(x*x + y*y);


/*
    Returns the normalize vector
*/
export const normalize = (x, y) => {
    const d = magnitude(x, y);
    return { 
        x: x/d, 
        y: y/d 
    };
}


/*
    Returns the distance between two points
*/
export const distance = (ax, ay, bx, by) => 
    Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));


/* 
    Returns a hex of the lighter or darker version of the color 
    passed, based on the percentage. Example: 
        shadeColor("#fd0000", 50) = #ff0000
        shadeColor("#fd0000", -50) = #7e0000
*/
export const shadeColor = (color, percent) => {
    let R = parseInt(color.substring(1,3), 16);
    let G = parseInt(color.substring(3,5), 16);
    let B = parseInt(color.substring(5,7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  
    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
    return "#"+RR+GG+BB;
}


