var count = 1;

var ss = {
  fixAllLinks: function() {
    // Get a list of all links in the page
    var allLinks = document.getElementsByTagName('a');
    // Walk through the list
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if ((lnk.href && lnk.href.indexOf('#') != -1) && 
          ( (lnk.pathname == location.pathname) ||
      ('/'+lnk.pathname == location.pathname) ) && 
          (lnk.search == location.search)) {
        ss.addEvent(lnk,'click',ss.smoothScroll);
      }
    }
  },

  smoothScroll: function(e) {
    if (window.event) {
      target = window.event.srcElement;
    } else if (e) {
      target = e.target;
    } else return;

    if (target.nodeName.toLowerCase() != 'a') {
      target = target.parentNode;
    }
  
    if (target.nodeName.toLowerCase() != 'a') return;
  
    anchor = target.hash.substr(1);
    var allLinks = document.getElementsByTagName('a');
    var destinationLink = null;
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if (lnk.name && (lnk.name == anchor)) {
        destinationLink = lnk;
        break;
      }
    }
    if (!destinationLink) destinationLink = document.getElementById(anchor);

    if (!destinationLink) return true;
  
    // Find the destination's position
    var destx = destinationLink.offsetLeft; 
    var desty = destinationLink.offsetTop;
    var thisNode = destinationLink;
    while (thisNode.offsetParent && 
          (thisNode.offsetParent != document.body)) {
      thisNode = thisNode.offsetParent;
      destx += thisNode.offsetLeft;
      desty += thisNode.offsetTop;
    }
  
    clearInterval(ss.INTERVAL);
  
    cypos = ss.getCurrentYPos();
  
ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
ss.INTERVAL =setInterval('ss.scrollWindow('+ss_stepsize+','+desty+',"'+anchor+'")',10);
  
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    if (e && e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  scrollWindow: function(scramount,dest,anchor) {
    wascypos = ss.getCurrentYPos();
    isAbove = (wascypos < dest);
    window.scrollTo(0,wascypos + scramount);
    iscypos = ss.getCurrentYPos();
    isAboveNow = (iscypos < dest);
    if ((isAbove != isAboveNow) || (wascypos == iscypos)) {
      window.scrollTo(0,dest);
      clearInterval(ss.INTERVAL);
      location.hash = anchor;
    }
  },

  getCurrentYPos: function() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
  },

  addEvent: function(elm, evType, fn, useCapture) {
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent){
      var r = elm.attachEvent("on"+evType, fn);
      return r;
    } else {
      alert("Handler could not be removed");
    }
  } 
}

ss.STEPS = 50;
ss.addEvent(window,"load",ss.fixAllLinks);

function goTop(acceleration, time) {

  acceleration = acceleration || 0.1;
  time = time || 16;

  var dx = 0;
  var dy = 0;
  var bx = 0;
  var by = 0;
  var wx = 0;
  var wy = 0;

  if (document.documentElement) {
    dx = document.documentElement.scrollLeft || 0;
    dy = document.documentElement.scrollTop || 0;
  }
  if (document.body) {
    bx = document.body.scrollLeft || 0;
    by = document.body.scrollTop || 0;
  }
  var wx = window.scrollX || 0;
  var wy = window.scrollY || 0;

  var x = Math.max(wx, Math.max(bx, dx));
  var y = Math.max(wy, Math.max(by, dy));

  var speed = 1 + acceleration;
  window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
  if(x > 0 || y > 0) {
    var invokeFunction = "goTop(" + acceleration + ", " + time + ")"
    window.setTimeout(invokeFunction, time);
  }
}

function rand(){
    return Math.floor(Math.random()*24);
}

function playSound(e){
  //num++;
  var num = rand();
  
  if (e.target.tagName == 'UL' && (count == 1))
  {
    var music=new Array("1.mp3", "2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3", "9.mp3", "10.mp3", "11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "16.mp3", "17.mp3", "18.mp3", "19.mp3", "20.mp3", "21.mp3", "22.mp3", "23.mp3", "24.mp3");

    document.getElementById("sounds").innerHTML = "<embed src='res/sounds/" + music[num] + "' autostart='true' loop='false' hidden='true'>";
  }
}

function ulOut(e)
{
  if (e.target.tagName == 'UL')
  {
    count = 1;
  }
}

function liOut(e)
{
  if (e.target.tagName == 'LI')
  {
    count = 0;
  }
}