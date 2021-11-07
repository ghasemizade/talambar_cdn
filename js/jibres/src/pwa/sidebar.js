

function handlePWASlideBar()
{
  $('body').off('mousedown.hamburger touchmove.hamburger').on('mousedown touchmove', function(_e)
  {
    if($(_e.target).parents('html[data-pwa]').length === 1)
    {
      console.log('click');
      console.log($(_e.target));
      if($(_e.target).parents('.hamburger').length || $(_e.target).hasClass('hamburger') )
      {
        console.log(11);
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
        console.log(12);
        // do nothing because clicked on sidebar
        // try to scroll or something else
      }
      else if($(_e.target).is('#sidebar'))
      {
        console.log(13);
        // do nothing because clicked on sidebar
        // sidebar is empty place of back
        pwaSidebarHide();
      }
      else if(!$('#sidebar').is(":visible"))
      {
        pwaSidebarHide();
        console.log(14);
        // do nothing because its hide!
      }
      else
      {
        console.log(15);
        pwaSidebarHide();
      }
    }
  });

  $('#sidebar a[href]').on('click', function()
  {
      setTimeout(function()
      {
        console.log('hide after click');
        pwaSidebarHide();
      }, 200);
  });
}


function pwaSidebarShow()
{
  $('body').attr('data-aside', 'open');
  $('#sidebar').show(100).attr('data-active', "");
  $('#pageHeader .pwa .hamburger').attr('data-active', "");
}


function pwaSidebarHide()
{
  $('body').attr('data-aside', null);
  $('#sidebar').hide(100).attr('data-active', null);
  $('#pageHeader .pwa .hamburger').attr('data-active', null);
}
