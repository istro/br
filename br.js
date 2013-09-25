// the first two variables are to avoid triggering the responses twice on mobile
var started = false,
    ended = false,
    a = new Audio('sounds/a.wav'),
    asharp = new Audio('sounds/asharp.wav'),
    b = new Audio('sounds/b.wav'),
    c = new Audio('sounds/c.wav'),
    csharp = new Audio('sounds/csharp.wav'),
    d = new Audio('sounds/d.wav'),
    dsharp = new Audio('sounds/dsharp.wav'),
    e = new Audio('sounds/e.wav'),
    f = new Audio('sounds/f.wav'),
    fsharp = new Audio('sounds/fsharp.wav'),
    g = new Audio('sounds/g.wav'),
    gsharp = new Audio('sounds/gsharp.wav'),
    self = this,
    replay = function(){
      var playlist = $('#playlist').val().replace(/[^a-g#]/g, ''),
        highlight = function(note){
          var current = $('#'+note);
          current.trigger('mousedown');
        };

      //...
    }


$('#piano')
  .bind('mousedown touchstart', function(e){
    if(!started){
      started = true;
      setTimeout(function(){ started = false }, 100);
      var key = $(e.target).closest('li');
      self[key.attr('id')].play();
      $(key).addClass('pressed');
    }
  })
  .bind('mouseup touchend', function(e){
    if(!ended){
      ended = true;
      setTimeout(function(){ ended = false }, 500);
      var log = $('#all-keys'),
          key = $(e.target).find('*').andSelf().filter('span').html()
          note = self[$(e.target).closest('li').attr('id')];
      log.html() == '' ? function(){$('#log').show(); log.append(key)}() : log.append(', ' + key);
      note.pause();
      note.currentTime = 0;
    }
  });

$('body').bind('mouseup touchend keyup', function(){
    $(this).find('li').removeClass('pressed');
  });

$('#play').bind('mouseup touchend', replay)

// Just for fun, i decided to bind some keyboard key codes to the keys as well.
$('body').keydown(function(e){
  var code = e.which;
  switch (code) {
    case 67:
      $('#c').trigger('mousedown');
    case 70:
      $('#csharp').trigger('mousedown');
    case 86:
      $('#d').trigger('mousedown');
    case 71:
      $('#dsharp').trigger('mousedown');
    case 66:
      $('#e').trigger('mousedown');
    case 78:
      $('#f').trigger('mousedown');
    case 74:
      $('#fsharp').trigger('mousedown');
    case 77:
      $('#g').trigger('mousedown');
    case 75:
      $('#gsharp').trigger('mousedown');
    case 188:
      $('#a').trigger('mousedown');
    case 76:
      $('#asharp').trigger('mousedown');
    case 190:
      $('#b').trigger('mousedown');
    default:
      break;
  }
});

$('body').keyup(function(e){
  var code = e.which;
  switch (code) {
    case 67:
      $('#c').trigger('mouseup');
    case 70:
      $('#csharp').trigger('mouseup');
    case 86:
      $('#d').trigger('mouseup');
    case 71:
      $('#dsharp').trigger('mouseup');
    case 66:
      $('#e').trigger('mouseup');
    case 78:
      $('#f').trigger('mouseup');
    case 74:
      $('#fsharp').trigger('mouseup');
    case 77:
      $('#g').trigger('mouseup');
    case 75:
      $('#gsharp').trigger('mouseup');
    case 188:
      $('#a').trigger('mouseup');
    case 76:
      $('#asharp').trigger('mouseup');
    case 190:
      $('#b').trigger('mouseup');
    default:
      break;
  }
});
