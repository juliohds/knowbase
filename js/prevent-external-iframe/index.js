/*
    Place this in your index.html for preventing the 
    use of your site in third party iframes. Don't forget 
    to replace "YOUR_HOST_HERE" with your host.
*/
(() => {
    let inExternalIframe = false;
    try {
      inExternalIframe = self != top && top.location.href.indexOf("<YOUR_HOST_HERE>") === -1;
    } catch (err) {
      inExternalIframe = true;
    } finally {
      inExternalIframe && top.location.replace(window.location.href);
    }
})()