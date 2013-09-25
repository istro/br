(function(){
  // these two variables are to avoid triggering the responses twice on mobile
  var started = false,
      ended = false;

  $('#piano')
    .bind('mousedown touchstart', function(e){
      if(!started){
        started = true;
        setTimeout(function(){ started = false }, 100)
        $(e.target).closest('li').addClass('pressed');
      }
    })
    .bind('mouseup touchend', function(e){
      if(!ended){
        ended = true;
        setTimeout(function(){ ended = false }, 500)
        var log = $('#all-keys'),
            key = $(e.target).find('*').andSelf().filter('span').html();
        log.html() == '' ? function(){$('#log').show(); log.append(key)}() : log.append(', ' + key);
      }
    });

  // this listener is on body so that if you click and drag away from a button it will still remove
  // the highlighting on mouseup
  $('body').bind('mouseup touchend keyup', function(){
      $(this).find('li').removeClass('pressed');
    });

  // I figure it would be more universal to not worry about commas or whatever someone might paste in
  // - just pick out the valid entries and play them back. Sanitize the string, and access it as an array.

  var replay = function(){
    var playlist = $('#playlist').val().replace(/[^a-g#]/g, ''),
        highlight = function(note){
          var current = $('#'+note);
          current.trigger('mousedown');
        };


  }

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



})();
