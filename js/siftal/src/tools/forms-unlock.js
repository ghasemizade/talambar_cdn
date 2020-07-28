

function unlockFormLoadingPage()
{
  $('body').attr('data-loading-form', null);
}


function unlockForm(_locked, _data)
{
  var unlockAll = true;
  if(_data && _data.msg && _data.msg[0] && _data.msg[0]['meta'] && _data.msg[0]['meta']['unlock'] === false)
  {
    unlockAll = false;
  }

  if(unlockAll && _locked)
  {
    $('input, button, textarea, [contenteditable], [data-ajaxify]').prop('disabled', false);
  }
  unlockFormLoadingPage();
  $('.submitedForm').removeClass('submitedForm');
  callFunc('loading_form', false);
}

