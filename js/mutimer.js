/**
 * MUTimer
 * Version: 1.0.alpha (6/11/2012 02:00)
 *
 * <parameter_name: default_value - description>:
 *
 * Main:
 *   month: "0" - "*" for next month, "0" for this month or 1 through 12 for the month
 *   day: "+1" - Offset for day of month day or + day
 *   hour: "23" - 0 through 23 for the hours of the day
 *   tz: "0" - Offset for your timezone in hours from UTC
 *   lab: "mutimer" - The id of the page entry where the timezone countdown is to show
 *
 * Common:
 *   msg: "Sorry, you are too late&hellip;" - Show this message on timer expired
 *   url: "" - Redirection URL on timer expired (empty string - disable redirection)
 *   delay: 0 - Redirection delay on timer expired
 *
 * Usage example:
 * new MUTimer({ month: '11', day: '11', hour: 12, tz: -8, lab: 'mymutimer' });
 */

/* CONFIGURATION OPTIONS */

var muStyleSheetPath = 'web/s/mutimer.css';  // path to the mutimer.css

/* DO NOT EDIT PAST THIS LINE */

// jQuery solution to add StyleSheets
function addstylesheet(path) {
    if(document.createStyleSheet) { // IE
        document.createStyleSheet(path);
    } else { // Other
        $('<link rel="stylesheet" type="text/css" href="'+path+'" />').appendTo('head');
    }
}

addstylesheet(muStyleSheetPath);  // add stylesheet to the HTML head section

/**
 * MUTimer object
 */
function MUTimer(options)
{
    this.config = {  // defaults
        month: 0,
        day  : '+1',
        hour : 23,
        tz   : 0,
        lab  : 'mutimer',
        msg  : 'Sorry, you are too late&hellip;',
        url  : '',
        delay: 0
    };

    // customizing with incoming options
    if(options.month) this.config.month = options.month;
    if(options.day) this.config.day = options.day+'';
    if(options.hour) this.config.hour = options.hour;
    if(options.tz) this.config.tz = options.tz;
    if(options.lab) this.config.lab = options.lab;
    if(options.msg) this.config.msg = options.msg;
    if(options.url) this.config.url = options.url;
    if(options.delay) this.config.delay = options.delay;

    // inner options
    this.config.msEmu = 999;
    this.config.msTimer = null;
    this.config.timer = document.getElementById(this.config.lab);

    // start the timer if the container exists
    if(this.config.timer) {
        je = jQuery('#'+this.config.lab);
        if(!je.hasClass('mutimer')) je.addClass('mutimer');
        if(!je.hasClass('default')) je.addClass('default');
        tdiff = setTZCountDown(this.config);     // get time distance
        displayTZCountDown(tdiff, this.config);  // run timer
        millisecondsEmulator(this.config);       // run milliseconds emulator
    }

    return this.config
}

function setTZCountDown(config)
{
    var toDate = new Date();
    if(config.month == '*') toDate.setMonth(toDate.getMonth() + 1);
    else if(parseInt(config.month) > 0) {
        if(parseInt(config.month) <= toDate.getMonth()) toDate.setYear(toDate.getYear() + 1);
        toDate.setMonth(parseInt(config.month) - 1);
    }
    if(config.day.substr(0,1) == '+') {
        var day1 = parseInt(config.day.substr(1));
        toDate.setDate(toDate.getDate() + day1);
    }
    else toDate.setDate(config.day);

    toDate.setHours(config.hour);
    toDate.setMinutes(0 - (config.tz * 60));
    toDate.setSeconds(0);
    var fromDate = new Date();
    fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
    var diffDate = new Date(0);
    diffDate.setMilliseconds(toDate - fromDate);
    return Math.floor(diffDate.valueOf()/1000);
}

function displayTZCountDown(tdiff, config)
{
    if(tdiff < 0) {
        config.timer.innerHTML = '<div class="expired">'+config.msg+'</div>';
        if(config.url != '') {
            if(config.delay) {
                setTimeout('document.location.href="' + config.url + '"', config.delay * 1000);
            } else {
                document.location.href = config.url;
            }
        }
    } else {
        var secs = tdiff % 60;
        if (secs < 10) secs = '0' + secs;
        var tdiff1 = (tdiff - secs) / 60;
        var mins = tdiff1 % 60;
        if(mins < 10) mins = '0' + mins;
        tdiff1 = (tdiff1 - mins) / 60;
        var hours = tdiff1 % 24;
        var days = (tdiff1 - hours) / 24;

        // reset milliseconds emulator
        clearTimeout(config.msTimer);
        config.msEmu = 999;
        millisecondsEmulator(config);

        var t = '';
        t += '<div class="clock">';
        t += '<div class="days">'+days+'<span>Дн'+(days == 4 ? 'я' : 'ей')+'</span></div>';
        t += '<div class="hr">'+hours+'<span>Час'+(hours == 4 ? 'a' : 'ов')+'</span></div>';
        t += '<div class="min">'+mins+'<span>минут</span></div>';
        t += '<div class="sec">'+secs+'<span>Секунд</span></div>';
        t += '<div class="ms" id="'+config.lab+'-ms">000<span>msec</span></div>';
        t += '</div>';
        config.timer.innerHTML = t;

        setTimeout(function(){displayTZCountDown(tdiff-1,config)} ,999);
    }
}

function millisecondsEmulator(config)
{
    config.msEmu -= 29;
    if(config.msEmu <= 0) config.msEmu = 999;

    e = document.getElementById(config.lab+'-ms');
    if(!e) return;

    var ms = config.msEmu;
    if(config.msEmu < 100) ms = '0' + ms;
    else if(config.msEmu < 10) ms = '00' + ms;
    e.innerHTML = ms + '<span>msec</span>';

    config.msTimer = setTimeout(function(){millisecondsEmulator(config)}, 33);
}


