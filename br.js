// the first two variables are to avoid triggering the responses twice on mobile
var started = false,
    ended = false,
    self = this,
    notes = {};

var addNote = function(val){
  var key = val.length>1 ? val[0]+"#" : val,
      newNote = {
        audio: new Audio('sounds/'+val+'.wav'),
        el: $('#'+val),
        key: key
      };
  notes[val] = newNote;
}

var log = function(note){
  var list = $('#all-keys'),
      key = notes[note].key.toUpperCase();
  list.html() == '' ? function(){$('#log').show(); list.append(key)}() : list.append(', ' + key);
};

var play = function(note){
  notes[note].audio.play();
  notes[note].el.addClass('pressed');
  log(note);
};

var stop = function(note){
  notes[note].el.removeClass('pressed');
  notes[note].audio.pause();
  notes[note].audio.currentTime = 0;
}

var replay = function(){
  var playlist = $('#playlist').val().toLowerCase().replace(/[^a-g#]|b#|e#/g, '').replace(/##+/g, '#'),
      playnote = function(note){
        play(note);
        setTimeout(function(){stop(note);}, 950);
      };

  for(i=1; i<=playlist.length; i++){
    var sharp = playlist[i] == '#' ? 'sharp' : '',
        thisnote = playlist[i-1]+sharp;
    if(sharp)
      i++;
    setTimeout( function(x){ return function(){ playnote(x) }; }(thisnote), 1000*i);
  }
};

// Just for fun, i decided to bind some keyboard key codes to the keys as well.

var notemap = {
  67: 'c',
  70: 'csharp',
  86: 'd',
  71: 'dsharp',
  66: 'e',
  78: 'f',
  74: 'fsharp',
  77: 'g',
  75: 'gsharp',
  188: 'a',
  76: 'asharp',
  190: 'b',
};

$('body').on('keydown keyup', function(e){
  var code = e.which,
      doit = true;

  // if the event key is a note key and they're not in playlist field - play it
  if(notemap[code] && e.target.getAttribute('id') != 'playlist') {
    if(e.type == 'keydown') {
      play(notemap[code]);
    } else {
      stop(notemap[code]);
    }
  }
});

///////////////////////////////////////////////////////////////////////////////

var setup = function(){
  var listOfKeys = $('.keys').children();
  for(i=0; i<listOfKeys.length; i++){
    addNote(listOfKeys[i].getAttribute('id'));
  };

  // Binding the event listeners

  $('#piano')
    .bind('mousedown touchstart', function(e){
      if(!started){
        // These two lines are for avoiding double triggering on mobile
        started = true;
        setTimeout(function(){ started = false }, 100);
        // Find the target key of the click, play it
        var currentNote = $(e.target).closest('li')[0].getAttribute('id');
        play(currentNote);
      }
    })
    .bind('mouseup touchend', function(e){
      if(!ended){
        // to avoid double triggering on mobile
        ended = true;
        setTimeout(function(){ ended = false }, 500);
        // Find the target key - stop it.
        var currentNote = $(e.target).closest('li')[0].getAttribute('id');
        stop(currentNote);
      }
    });

  $('#play').bind('mouseup touchend', replay)
};

$(setup);
