jQuery(function($) {
  $('#gear')
    .css('-webkit-transform-origin','50% 50%')
    .css('-webkit-transform-origin','50% 50%');
  
  var i= 0;
  
  setInterval(function () {
    i += 0.2;
    
    $('#gear')
      .css('-webkit-transform','rotate('+i+'deg)')
      .css('-moz-transform','rotate('+i+'deg)');
  },50);
  
  $('[href]').click(function(e) {
    console.log(this);
    window.location = $(this).attr('href');
  });
});

jQuery(function($){
  function Clock (options) {
    $.extend(this, options);
    this.canvas = $(this.canvas);
    this.ctx = this.canvas[0].getContext('2d');
    this.width = this.canvas.width();
    this.height = this.canvas.height();
    this.canvas.attr('width', this.width);
    this.canvas.attr('height', this.height);
    this.start();
  }
  
  Clock.prototype = {
    draw: function  () {
      this.clear();
      this.background();
      this.foreground();
    }
    ,tick: function  () {
      var now = new Date();
      this.timing = (now - this.time) / this.schedule;
      this.ticked.call(this);
      this.draw();
      if(this.timing > 1) {
        this.stop();
        return this.finished.call(this);
      }
    }
    ,setTimeout: function  () {
      var self = this;
      this.stop();
      this.interval = setInterval(function() {
        self.tick();
      }, 500);
    }
    ,start: function  () {
      this.timing = 0;
      this.time = new Date();
      this.setTimeout();
    }
    ,stop: function  () {
      clearInterval(this.interval);
    }
    ,restart: function  () {
      this.stop(); this.start();
    }
    ,clear: function  () {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    ,paint: function  (stroke, fill) {
      this.ctx.strokeStyle = stroke;
      this.ctx.fillStyle = fill;

      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
    ,background: function  () {
      this.ctx.beginPath();
      this.ctx.arc(this.width/2, this.height/2, this.height/2, rad(0), rad(360), false);
      this.paint('black', 'grey');
    }
    ,foreground: function  () {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width/2, this.height/2);
      this.ctx.arc(this.width/2, this.height/2, this.height/2, rad(this.timing*359), rad(360), false);
      this.ctx.lineTo(this.width/2, this.height/2);
      this.paint('black', 'white');
    }
    ,ticked: function  () {}
    ,finished: function  () {}
  }

  //alert(jQuery('li img')[0].style.filters);
  var FirstRun = true;
  var  CycleTime = 1000;

  var cycleClock = new Clock({
    canvas: '#portfolio .clock'
    ,schedule: CycleTime
    ,finished: function  () {
      $('#portfolio .next').click();
    }
  });
  
  $('.meta').each(function(){
    var self = $(this);
    self.height(self.height());
  });
  
  $('.meta:not(:first) > *').hide();
  
  $('#portfolio ol').cycle({
    fx: 'scrollHorz'
    ,timeout: 0
    ,easeIn: 'easeOutSine'
    ,easeOut: 'easeInSine'
    ,pager: '#portfolio .pager'
    ,next: '#portfolio .next'
    ,before: function() {
      if(FirstRun) {
        FirstRun = false;
        return;
      }
      var index = $(this).parent().children().index(this);
      var picker = $($('#portfolio .pager a').get(index));

      if(picker.hasClass('activeSlide')) return;
      
      $('.meta > *').fadeOut();
    }
    ,after: function () {
      $(this).find('.meta > *').fadeIn();
      cycleClock.start();
    }
  });
  
  $('.pager a').text('');
    
  var radius = 50;
  var circumference = 2 * Math.PI * radius;
  var bite = 4;
  var teeth = 12;
  var gear = $('#gear');
  var ctx =  gear[0].getContext('2d');
  var x = 20, y = 220;  
  
  gear.attr('width', gear.width());
  gear.attr('height', gear.height());

  function rad (deg) {
    return deg * Math.PI / 180;
  }

  function drawGear (offset) {

    ctx.clearRect(0, 0, gear.width(), gear.height());
    ctx.fillStyle = 'rgb(201, 101, 35)';
    ctx.strokeStyle = 'transparent'
    ctx.beginPath();
    var start, end, dx, dy, cx, cy, step = 0;
  
    var degPerTooth = 360 / teeth;
  
    start = rad(offset - ((teeth - 1) * degPerTooth));
    px = x + radius * Math.cos(start);
    py = y + radius * Math.sin(start);
  
    ctx.moveTo(px, py);
  
    while(step < teeth) {
      end = offset - (step * degPerTooth);
      start = end + degPerTooth;
      
      dx = x + radius * Math.cos(rad(end));
      dy = y + radius * Math.sin(rad(end));
      
      cdx = x + (radius + bite*2) * Math.cos(rad(end + degPerTooth));
      cdy = y + (radius + bite*2) * Math.sin(rad(end + degPerTooth));
    
      cx = x + (radius + bite) * Math.cos(rad(start));
      cy = y + (radius + bite) * Math.sin(rad(start));
      
      ccx = x + (radius - bite) * Math.cos(rad(start));
      ccy = y + (radius - bite) * Math.sin(rad(start));
      
      ctx.quadraticCurveTo(ccx, ccy, cx, cy);
      ctx.quadraticCurveTo(cdx, cdy, dx, dy);
    
      px = dx; py = dy;
      step++;
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill(); 
    
    setTimeout(function(){
      drawGear(offset + 0.5);
    }, 30);
  }
  
  drawGear(360);
});
