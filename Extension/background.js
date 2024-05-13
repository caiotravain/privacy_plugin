// Listen for web requests
browser.webRequest.onBeforeRequest.addListener(
    function(details) {
      let currentDomain = new URL(details.originUrl).hostname;
      let requestDomain = new URL(details.url).hostname;
       let Number_of_cookies = 0;
  
      if (currentDomain !== requestDomain) {
        console.log(`Third-party request to ${requestDomain} detected from ${currentDomain}`);
  
        // Send a message to the content script
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {requestDomain: requestDomain});
        });

  
        
      }
        let currentDomain_without_www = currentDomain.replace("www.", "");
        let requestDomain_without_www = requestDomain.replace("www.", "");
        browser.cookies.getAll({domain: currentDomain_without_www}).then(cookies => {
          console.log(`Number of cookies for ${currentDomain_without_www}: ${cookies.length}`);
          Number_of_cookies = cookies.length;
          browser.cookies.getAll({domain: requestDomain_without_www}).then(cookies => {
            console.log(`Number of cookies for ${requestDomain}: ${cookies.length}`);
            Number_of_cookies += cookies.length;
          });
        });
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {cookieCount: Number_of_cookies});
        });
    







      //detect the canvas fingerprinting
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      //  CREDITS https://www.browserleaks.com/canvas#how-does-it-work https://github.com/artem0/canvas-fingerprinting/blob/master/fingerprinting/fingerprint.js
      var txt = 'CANVAS_FINGERPRINT';
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125,1,62,20);
      ctx.fillStyle = "#069";
      ctx.fillText(txt, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText(txt, 4, 17);
      var canvasData = canvas.toDataURL();
      canvasData_string = canvasData;
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {canvasData: canvasData_string});
      });


      //potential hijacking and hooks detection
      if (details.url.startsWith('http://') ) {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {httpRequest: details.url});
        });
      }
      if (currentDomain.startsWith('http://') ) {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {httpRequest: currentDomain});
        });
      }
      //detect if the website is running on port 80 or 443
      const port = new URL(details.url).port;
      //if the port is not 80 or 443
      if (port !== '80' && port !== '443') {
        console.log(`The website is running on port ${port}`);
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {port: port});
        });
      }



    


    },
    {urls: ["<all_urls>"]},
  );
  browser.webRequest.onHeadersReceived.addListener(
    function(details) {
      // Check for the X-Frame-Options header
      let achou = false;
      if (details.type == "main_frame") {
      for (let header of details.responseHeaders) {
        if (header.name.toLowerCase() === "x-frame-options") {
          no_anticlickjacking = "TRUE"
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")


          console.log(`X-Frame-Options header found with value: ${header.value}`);
          achou  = true

        }
      }
        if (!achou){
          no_anticlickjacking = "FALSE"
          // If we get here, the X-Frame-Options header was not found
        }
      }
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {anticlick: no_anticlickjacking});
      })
    },

    {urls: ["<all_urls>"]},
    ["responseHeaders"]
  );
