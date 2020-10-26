function formToolsRunner()
{
  toggleRadio();
  radioSave();
  checkboxSave();
}



function toggleRadio()
{
  $('.togglable input[type=radio]').off("click.setting").on("click.setting", function(event)
  {
    var $thisRadio = $(this);

    if($thisRadio.prop('checked-toggle'))
    {
      $thisRadio.prop('checked', false);
      $thisRadio.prop('checked-toggle', false);
    }
    else
    {
      $thisRadio.prop('checked-toggle', true);
      setTimeout(function()
      {
        $thisRadio.prop('checked-toggle', false);
      }, 1000)
    }
  });
}


function radioSave()
{
  $('form[data-patch] input[type=radio]').off("click.setting").on("click.setting", function(event)
  {
    var myForm = $(this).parents('form[data-patch]');
    if(myForm.length === 1)
    {
      $(myForm).ajaxify();
    }
  });

  $('form[data-patch] input[type=radio]').off("keydown.setting").on("keydown.setting", function(_e)
  {
    var arrowKeys = [37, 38, 39, 40];
    if (arrowKeys.indexOf(_e.which) !== -1)
    {
      if(_e.shiftKey === true)
      {

      }
      else
      {
        return false;
      }
    }
  });
}



function checkboxSave()
{
  $('form[data-patch] input[type=checkbox]').off("click.setting").on("click.setting", function(event)
  {
    var myForm = $(this).parents('form[data-patch]');
    if(myForm.length === 1)
    {
      $(myForm).ajaxify();
    }
  });
}

