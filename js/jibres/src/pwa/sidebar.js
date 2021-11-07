

function handlePWASlideBar()
{
  $('body').off('mousedown.hamburger touchmove.hamburger').on('mousedown touchmove', function(_e)
  {
    if($(_e.target).parents('html[data-pwa]').length === 1)
    {
      if($(_e.target).parents('.hamburger').length || $(_e.target).hasClass('hamburger') )
      {
        // click on hanlder, do nothing!
        if($('#sidebar').is(":visible"))
        {
          pwaSidebarHide();
        }
        else
        {
          pwaSidebarShow();
        }
      }
      else if($(_e.target).parents('#sidebar').length)
      {
        // do nothing because clicked on sidebar
      }
      else if($(_e.target).is('#sidebar'))
      {
        // do nothing because clicked on sidebar
        // sidebar is empty place of back
        pwaSidebarHide();
      }
      else if(!$('#sidebar').is(":visible"))
      {
        // do nothing because its hide!
      }
      else
      {
        pwaSidebarShow();
      }
    }
  });
}


function pwaSidebarShow()
{
  $('body').attr('data-aside', '');
  $('#sidebar').show(100).attr('data-active', "");
  $('#pageHeader .pwa .hamburger').attr('data-active', "");
}


function pwaSidebarHide()
{
  $('body').attr('data-aside', null);
  $('#sidebar').hide(100).attr('data-active', null);
  $('#pageHeader .pwa .hamburger').attr('data-active', null);
}
