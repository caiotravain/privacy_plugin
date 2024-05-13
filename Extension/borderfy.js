document.body.style.border = "5px solid red";
//add screen that shows how many cookies you have
// Path: cookie.js
var div_cookie = document.createElement("div");
div_cookie.style.position = "fixed";
div_cookie.style.bottom = "0";
div_cookie.style.right = "0";
div_cookie.style.width = "100px";
div_cookie.style.height = "100px";
div_cookie.style.backgroundColor = "brown";
div_cookie.style.color = "white";
div_cookie.style.textAlign = "center";
div_cookie.style.lineHeight = "100px";
div_cookie.style.zIndex = "900000";

div_cookie.innerHTML = "0 Cookies";
document.body.appendChild(div_cookie);
// Path: cookie.js
var cookieCount = 0;    
var cookie_list = [];
var domain_list = [];
var localStorage_list = [];
var canvasData = {};
var sessionStorageData = {};
var httpRequest = "";
var http_requests = [];
var have_xframe ="";
var hook = "";
var change_navigation = "";
browser.runtime.onMessage.addListener(function(message) {
    //add response to another line of the div
    if (message.requestDomain !== undefined) {
        domain_list.push(message.requestDomain);
    }
    if (message.cookieCount !== undefined) {
        //check if is lower than current cookie count
        if (message.cookieCount < cookieCount) {
            cookieCount = cookieCount
        } else {
        cookieCount = message.cookieCount;
        }
        
        console.log("Cookie count: " + cookieCount);
        div_cookie.innerHTML = cookieCount + " Cookies";
    }
    //canvas fingerprinting
    if (message.canvasData !== undefined) {
        canvasData = message.canvasData;
    }
    if (message.httpRequest !== undefined) {
        httpRequest = message.httpRequest;
        http_requests.push(httpRequest)
        
    }
    if (message.anticlick !== undefined) {
        console.log(have_xframe)
        if (have_xframe != "TRUE"){
            have_xframe = message.anticlick

        }
        console.log(have_xframe)
        
    }
    if (message.port !== undefined) {
        hook = message.port;
        console.log("port" + hook)
    }
    if (message.navigation !== undefined) {
        change_navigation = message.navigation;
        console.log("navigation?" + change_navigation)
    }



    
  });

let domain_count = 0;
let domain_list_string = "";
let domain_count_string = "";
let domain_count_div = document.createElement("div");
domain_count_div.style.position = "fixed";
domain_count_div.style.display = "flex";
domain_count_div.style.flexDirection = "column";
domain_count_div.style.justifyContent = "center";
domain_count_div.style.alignItems = "center";
domain_count_div.style.bottom = "0";
domain_count_div.style.left = "0";
domain_count_div.style.width = "100px";
domain_count_div.style.height = "100px";
domain_count_div.style.backgroundColor = "brown";
domain_count_div.style.color = "white";
domain_count_div.style.textAlign = "center";
domain_count_div.style.fontSize = "15px";
domain_count_div.style.zIndex = "900000";

var is_clicked = false;


document.body.appendChild(domain_count_div);

setInterval(function() {
    if (is_clicked) {
        return;
    }
    domain_list_string = domain_list.join(", ");
    domain_count = domain_list.length;
    domain_count_string = domain_count
    //domain count  + <br> + domain list
    domain_count_div.innerHTML = domain_count_string
    domain_count_div.innerHTML += "<br>" + "third party requests"
}, 1000);

// //add local storage to show the local storage information on bottom at the middle
let localStorage_count = 0;
let localStorage_list_string = "";
let localStorage_count_string = "";
let localStorage_count_div = document.createElement("div");
document.body.appendChild(localStorage_count_div);//make it expandable
// Create a div for local storage information
let localStorage_div = document.createElement("div");
localStorage_div.style.position = "fixed";
localStorage_div.style.bottom = "0";
localStorage_div.style.left = "50%";
localStorage_div.style.width = "200px";
localStorage_div.style.height = "100px";
localStorage_div.style.backgroundColor = "brown";
localStorage_div.style.color = "white";
localStorage_div.style.textAlign = "center";
localStorage_div.style.lineHeight = "100px";
localStorage_div.innerHTML = "Local Storage Info";
localStorage_div.style.fontSize = "15px";
localStorage_div.style.zIndex = "900000";

document.body.appendChild(localStorage_div);

// Add an event listener to the div so it expands when clicked
localStorage_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (localStorage_div.style.height === "100px") {
        localStorage_div.style.height = "300px";
        localStorage_div.style.width = "400px";
        localStorage_div.style.overflowY = "scroll";
        localStorage_div.style.lineHeight = "20px";
        // Display local storage information
        let localStorage_info = "";
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            localStorage_info += key + ": " + value + "<br>";
        }
        localStorage_div.innerHTML = localStorage_info;
    } else {
        localStorage_div.style.height = "100px";
        localStorage_div.style.width = "200px";
        localStorage_div.innerHTML = "Local Storage Info";
        localStorage_div.style.lineHeight = "100px";

    }
});

// Add an event listener to the div so it expands when clicked - domain count
domain_count_div.addEventListener("click", function() {
    is_clicked = !is_clicked;
    // Toggle between expanded and collapsed state
    if (domain_count_div.style.height === "100px") {
        domain_count_div.style.height = "300px";
        domain_count_div.style.width = "400px";
        domain_count_div.style.overflowY = "scroll";
        domain_count_div.style.lineHeight = "20px";
        // Display local storage information
        let domain_info = "";
        for (let i = 0; i < domain_list.length; i++) {
            let domain = domain_list[i];
            domain_info += domain + "<br>";
        }
        domain_count_div.innerHTML = domain_info;
    } else {
        domain_count_div.style.height = "100px";
        domain_count_div.style.width = "100px";
        domain_count_div.innerHTML = domain_count_string;
    }
});

//get information canvas function from 
let canvasData_string = "";
let canvasData_div = document.createElement("div");
document.body.appendChild(canvasData_div);
canvasData_div.style.position = "fixed";
canvasData_div.style.top = "0";
canvasData_div.style.right = "0";
canvasData_div.style.width = "200px";
canvasData_div.style.height = "100px";
canvasData_div.style.backgroundColor = "brown";
canvasData_div.style.color = "white";
canvasData_div.style.textAlign = "center";
canvasData_div.style.lineHeight = "100px";
canvasData_div.innerHTML = "Canvas Fingerprinting";
canvasData_div.style.fontSize = "15px";
//makes always on front of everything
canvasData_div.style.zIndex = "9001000";


// Add an event listener to the div so it expands when clicked
canvasData_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (canvasData_div.style.height === "100px") {
        canvasData_div.style.height = "300px";
        canvasData_div.style.width = "400px";
        canvasData_div.style.overflowY = "scroll";
        canvasData_div.style.lineHeight = "20px";
        // Display local storage information
        canvasData_div.innerHTML = canvasData;
    } else {
        canvasData_div.style.height = "100px";
        canvasData_div.style.width = "200px";
        canvasData_div.innerHTML = "Canvas Fingerprinting";
        canvasData_div.style.lineHeight = "100px";

    }
});

// Get all keys and values from session storage


// //add session storage to show the session storage information on top at the middle
let sessionStorage_count = 0;
let sessionStorage_list_string = "";
let sessionStorage_count_string = "";
let sessionStorage_count_div = document.createElement("div");
document.body.appendChild(sessionStorage_count_div);
// Create a div for session storage information
let sessionStorage_div = document.createElement("div");
sessionStorage_div.style.position = "fixed";
sessionStorage_div.style.top = "0";
sessionStorage_div.style.left = "50%";
sessionStorage_div.style.width = "200px";
sessionStorage_div.style.height = "100px";
sessionStorage_div.style.backgroundColor = "brown";
sessionStorage_div.style.color = "white";
sessionStorage_div.style.textAlign = "center";
sessionStorage_div.style.lineHeight = "100px";
sessionStorage_div.innerHTML = "Session Storage Info";
sessionStorage_div.style.fontSize = "15px";
sessionStorage_div.style.zIndex = "900000";


document.body.appendChild(sessionStorage_div);
sessionStorage_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (sessionStorage_div.style.height === "100px") {
        sessionStorage_div.style.height = "300px";
        sessionStorage_div.style.width = "400px";
        sessionStorage_div.style.overflowY = "scroll";
        sessionStorage_div.style.lineHeight = "20px";
        // Display local storage information
        let sessionStorage_info = "";
        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i);
            let value = sessionStorage.getItem(key);
            sessionStorage_info += key + ": " + value + "<br>";
        }
        sessionStorage_div.innerHTML = sessionStorage_info;
    } else {
        sessionStorage_div.style.height = "100px";
        sessionStorage_div.style.width = "200px";
        sessionStorage_div.innerHTML = "Session Storage Info";
        sessionStorage_div.style.lineHeight = "100px";

    }

});

//get information canvas function from 
let http_div = document.createElement("div");
document.body.appendChild(http_div);
http_div.style.position = "fixed";
http_div.style.top = "0";
http_div.style.left = "0";
http_div.style.width = "100px";
http_div.style.height = "100px";
http_div.style.backgroundColor = "brown";
http_div.style.color = "white";
http_div.style.textAlign = "center";
http_div.style.lineHeight = "100px";

  

http_div.style.fontSize = "15px";
//makes always on front of everything
http_div.style.zIndex = "9001000";
//appear an info that when hovered it shows "NO ANTICLICKJACKING HEADER"
let info_div = document.createElement("div");

setTimeout(function() {
    console.log(http_requests.length)
    if (http_requests.length != 0){
        http_div.innerHTML = "Insecure";
        http_div.style.backgroundColor = "brown";

    }
    else {
        http_div.innerHTML = "Secure";
        http_div.style.backgroundColor = "green";
    }
    if (have_xframe == "FALSE"){
        console.log(have_xframe)
        // Create a new div
        // Set its position to top right
        info_div.style.position = "fixed";
        info_div.style.top = "0";
        info_div.style.left = "80px";
        info_div.style.width = "20px";
        info_div.style.height = "20px";
        info_div.style.backgroundColor = "red";
        info_div.style.color = "white";
        info_div.style.textAlign = "center";
        info_div.style.lineHeight = "20px";

        info_div.style.zIndex = "99101000";
        // Add an "i" to the div
        info_div.innerHTML = "i";
        // Set a hover message
        info_div.title = "No anti-clickjacking header";
        // Append the div to the body
        document.body.appendChild(info_div)
    }
    else{
        info_div.style.width = "0px";
        info_div.style.height = "0px";
        info_div.innerHTML = "";
        info_div.title = "No anti-clickjacking header";


    }
}, 1000);

// Add an event listener to the div so it expands when clicked
info_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (info_div.style.width === "20px") {
        info_div.style.width = "200px";
        info_div.style.lineHeight = "20px";


        info_div.innerHTML = "No anti-clickjacking header"
    } else {
        info_div.style.width = "20px";
        info_div.title = "No anti-clickjacking header";
        info_div.innerHTML = "i"
    }
});
// Check if the page has the X-Frame-Options header




// Add an event listener to the div so it expands when clicked
http_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (http_div.style.height === "100px") {
        http_div.style.height = "300px";
        http_div.style.width = "400px";
        http_div.style.overflowY = "scroll";
        http_div.style.lineHeight = "20px";
        http_div.style.zIndex = "99102000";
        // Display local storage information
        let http_info = "";
        for (let i = 0; i < http_requests.length; i++) {
            let http_insecure = http_requests[i];
            http_info += http_insecure + "<br>";
        }
        http_div.innerHTML = http_info;
    } else {
        http_div.style.height = "100px";
        http_div.style.width = "100px";
        http_div.innerHTML = "Insecure";
        http_div.style.lineHeight = "100px";
        http_div.style.zIndex = "9910900";


    }
});

//detect if its hooked or hijacked
let hook_div = document.createElement("div");
document.body.appendChild(hook_div);
hook_div.style.position = "fixed";
hook_div.style.top = "50%";
hook_div.style.right = "0";
hook_div.style.width = "100px";
hook_div.style.height = "100px";
hook_div.style.backgroundColor = "green";
hook_div.style.color = "white";
hook_div.style.textAlign = "center";
hook_div.style.lineHeight = "100px";
hook_div.innerHTML = "NO HOOKS";
hook_div.style.fontSize = "15px";
hook_div.style.zIndex = "9001000";
// if its hooked or hijacked then change to red
//get the original script
var original_script = document.createElement("script");
original_script = document.querySelector("script");
var script = document.createElement("script");
var script_div = document.createElement("div");
script_div.style.position = "fixed";
expanding_text = [];   
var como_ta = "secure";

function analyzeJavaScriptBehavior() {
    // Example: Check if page tries to prevent user from leaving
    window.addEventListener('beforeunload', function(event) {
        console.log('Warning: This page is attempting to prevent you from leaving.');
        // Add a div to the script div
        hook_div.innerHTML = "HOOKED";
        hook_div.style.backgroundColor = "brown";
        expanding_text.push("Warning: This page is attempting to prevent you from leaving.");
    });

    // Example: Check for modification of browser history
    window.addEventListener('popstate', function(event) {
        console.log('Warning: This page is attempting to modify your browser history.');
        // Add a div to the script div
        hook_div.innerHTML = "HOOKED";
        hook_div.style.backgroundColor = "brown";
        expanding_text.push("Warning: This page is attempting to modify your browser history.");
    });
    // Check if the original script is changed
    script = document.querySelector("script");
    if (script !== null) {
        if (script !== original_script) {
            hook_div.innerHTML = "HOOKED";

            expanding_text.push("Warning: This page is attempting to modify the original script.");
            hook_div.style.backgroundColor = "brown";
            original_script = script;
        }
    }
    if (hook !== ""){
        hook_div.innerHTML = "HOOKED";
        hook_div.style.backgroundColor = "brown";
        expanding_text.push("Warning: This page is running in diferent port than 80 or 443.");
    }
    como_ta = script_div.innerHTML;
}

// Add an event listener to the div so it expands when clicked
hook_div.addEventListener("click", function() {
    // Toggle between expanded and collapsed state
    if (hook_div.style.height === "100px") {
        hook_div.style.height = "300px";
        hook_div.style.width = "400px";
        hook_div.style.overflowY = "scroll";
        hook_div.style.lineHeight = "20px";
        hook_div.style.zIndex = "99102000";
        // Display local storage information
        let hook_info = "";
        for (let i = 0; i < expanding_text.length; i++) {
            let hook = expanding_text[i];
            hook_info += hook + "<br>";
        }
        hook_div.innerHTML = hook_info;
    } else {
        hook_div.style.height = "100px";
        hook_div.style.width = "100px";
        if (expanding_text.length == 0){
            hook_div.innerHTML = "NO HOOKS";
            hook_div.style.backgroundColor = "green";
        }
        else{
            hook_div.innerHTML = "HOOKED";
            hook_div.style.backgroundColor = "brown";
        }
        hook_div.style.lineHeight = "100px";
        hook_div.style.zIndex = "9001000";

    }
});
setInterval( analyzeJavaScriptBehavior, 1000);

//make a grade number representing the privacy of the page
let grade_string = "";

setTimeout(function() {
let grade = 100;
if (cookieCount > 0) {
    grade -= 10;
    if (cookieCount > 10) {
        grade -= 10;
    }
}
if (domain_count > 0) {
    grade -= 2;
    if (domain_count > 10) {
        grade -= 5;
    }
}
if (localStorage.length > 0) {
    grade -= 5;
    if (localStorage.length > 10) {
        grade -= 5;
    }
}
if (sessionStorage.length > 0) {
    grade -= 2;
    if (sessionStorage.length > 10) {
        grade -= 10;
    }
}
if (http_requests.length > 0) {
    grade -= 10;
    if (http_requests.length > 10) {
        grade -= 10;
    }
}
if (have_xframe == "FALSE") {
    grade -= 13;
}
if (hook !== "") {
    grade -= 13;
}

if (expanding_text.length > 2) {
    grade -= 5;
}
//change color depending on the grade
if (grade < 50){
    grade_div.style.backgroundColor = "red";
    grade_div.style.color = "white";
}
else if (grade < 80){
    grade_div.style.backgroundColor = "yellow";
    grade_div.style.color = "black";
}
else{
    grade_div.style.backgroundColor = "green";
    grade_div.style.color = "white";

}

grade_string = grade.toString();
grade_div.innerHTML = grade_string;
console.log(grade)
}
, 5000);

//MAKE A GRADE FOR THE PAGE
let grade_div = document.createElement("div");
document.body.appendChild(grade_div);
grade_div.style.position = "fixed";
grade_div.style.bottom = "50%";
grade_div.style.left = "0";
grade_div.style.width = "100px";
grade_div.style.height = "100px";
grade_div.style.color = "white";
grade_div.style.textAlign = "center";
grade_div.style.lineHeight = "100px";
grade_div.innerHTML = grade_string;
grade_div.style.fontSize = "15px";
grade_div.style.zIndex = "900000";
//make it round
grade_div.style.borderRadius = "50%";




// setInterval(function() {
//     div_cookie.innerHTML = cookieCount + " Cookies";
// }, 1000);


