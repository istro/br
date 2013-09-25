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
$('body').bind('touchend mouseup', function(){
  $(this).find('li').removeClass('pressed');
  });
