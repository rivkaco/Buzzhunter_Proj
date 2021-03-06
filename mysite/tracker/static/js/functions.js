window.onunload = tableOneData;
var user_id = "";
var user_name = "";
var user_email = "";

// the following section of code is for scrolling data

var output = document.createElement("p");
        document.body.appendChild(output);


        output.style.display = "none";

        function getDocHeight() {
            var D = document;
            return Math.max(
                    D.body.scrollHeight, D.documentElement.scrollHeight,
                    D.body.offsetHeight, D.documentElement.offsetHeight,
                    D.body.clientHeight, D.documentElement.clientHeight
            )
        }

        function amountscrolled(){
            var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
            var docheight = getDocHeight();
            var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var trackLength = docheight - winheight;
            var pctScrolled = Math.floor(scrollTop/trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
            output.innerHTML = pctScrolled +'%'
        }

        window.addEventListener("scroll", function(){
            amountscrolled()
        }, false);

/**********************************************************************************************/

function GetCookieSession (name) {
    var arg = name + "=";
    var alength = arg.length;
    var clength = document.cookie.length;
    var i = 0;
    while (i < clength) {
        var j = i + alength;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal (j);
            i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function SetCookieSessions (name, value) {
    var argv = SetCookieSessions.arguments;
    var argc = SetCookieSessions.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape (value) +
    ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
    ((path == null) ? "" : ("; path=" + path)) +
    ((domain == null) ? "" : ("; domain=" + domain)) +
    ((secure == true) ? "; secure" : "");
}

function DeleteCookie (name) {
    var exp = new Date();
    exp.setTime (exp.getTime() - 1);
    var cval = GetCookieSession (name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}

var expDays = 30; //cookie is deleted after 30 days
var exp = new Date();
exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

function amt(){ //keeps track of session ID per user
    var count = GetCookieSession('count');
    if(count == null) {
        SetCookieSessions('count','1');
        return 1
    }
    else {
        var newcount = parseInt(count) + 1;
        DeleteCookie('count');
        SetCookieSessions('count',newcount,exp);
        return count
    }
}

function getCookieVal(offset) { //Rivka: what does this do? Check the value of the cookie? Different from the function getCookie? Returns the entire cookie?
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1)
    endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}


/**********************************************************************************************/

// the following section of code sets, gets, and returns cookie values:

if ( window.location.pathname === "/tracker/portfolio/" || window.location.pathname === "/tracker/website/") {
    document.getElementsByClassName('wpcf7-submit')[0].addEventListener('click', function () {

        if ((document.getElementsByName('your-name')[0].value != "") &&
            document.getElementsByName('your-email')[0].value != "") {

            user_name = document.getElementsByName('your-name')[0].value;
            user_email = document.getElementsByName('your-email')[0].value;

            setCookie('buzz_cookie', user_id + " - name: " + user_name + ", email: " + user_email, 365);

        }
        return user_name, user_email;
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

  function getIP(json) {
    console.log("IP address: ", json.ip);
    // document.cookie = (json.ip); "expires=Thu, 18 Dec 2018 12:00:00 UTC";
    setCookie('buzz_cookie', json.ip, 365);
    console.log("inside cookie:" + json.ip);
    user_id = json.ip;

  }

    function getCookie(cname) {//pass in key
        var name = cname + "=";
        var ca = document.cookie.split(';'); //list of key-value pairs of cookies
        for(var i = 0; i < ca.length; i++) { //loops through length of list
            var c = ca[i];
            while (c.charAt(0) == ' ') { //gets rid of leading white spcae
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length); //returns the value of the key-value pair
            }
        }

    return "";

    }

// if user submits the form with both their name and email:

var session_value = amt();

/**********************************************************************************************/

function tableOneData() {
    if (document.body.scrollHeight > document.body.clientHeight) {
        var data = new FormData();

        data.append("user_id", user_id);
        data.append("user_name", user_name);
        data.append("user_email", user_email);
        data.append("overall_time", TimeMe.getTimeOnCurrentPageInSeconds()+'s');
        data.append('session_id', session_value);
        data.append('percentage_scroll', output.innerText);

    } else {

        var data = new FormData();

        data.append("user_id", user_id);
        data.append("user_name", user_name);
        data.append("user_email", user_email);
        data.append("overall_time", TimeMe.getTimeOnCurrentPageInSeconds() + 's');
        data.append('session_id', session_value);
        data.append('percentage_scroll', "No scroll ability");
    }
        fetch("/tracker/api/index/1", {
            method: "post",
            body: data
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                // alert(JSON.stringify(data))
            })

}

/**********************************************************************************************/


document.addEventListener('click', function(event) { //add a click event listener on the whole doc
    var sPath = window.location.pathname;
    var xOffset=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
    var yOffset=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    var X = event.clientX+xOffset;
    var Y = Math.round(event.clientY+yOffset);
    console.log('x: ' + X + ' y: ' + Y);
    // if user clicks one of the SVG (image) elements
    if(event.target instanceof SVGElement) {
        var s = new XMLSerializer();
        var d = event.target;
        var str = s.serializeToString(d);
        var data = new FormData();
        data.append('user_id',  user_id);
        data.append('current_page', sPath);
        data.append('buttons_clicked', str);
        data.append('coordinates', 'x: ' + X + ' y: ' + Y);
        data.append('session_id', session_value);
    }

    else {
        var data = new FormData();
        data.append('user_id',  user_id);
        data.append('current_page', sPath);
        data.append('buttons_clicked', '"' + event.target.outerHTML.substr(0, 150) + '"');
        data.append('coordinates', 'x: ' + X + ' y: ' + Y);
        data.append('session_id', session_value);

    }


    fetch("/tracker/api/index/2", {
        method: "POST",
        body: data
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        // alert(JSON.stringify(data))
    });

    var data2 = new FormData();
        data2.append('x_coordinate',  X);
        data2.append('y_coordinate', Y);
        data2.append('current_page', sPath);

    fetch("/tracker/api/index/3", {
        method: "POST",
        body: data2
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        // alert(JSON.stringify(data))
    });

});