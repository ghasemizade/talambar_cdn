
function handleFocusModePushState()
{
  $('#sidebar .items .item').on('mouseenter', function(_e){
    console.log(12333);
  });
}


function handleFocusMode()
{

  if(urlJibres('zone') === 'business-website')
  {
    // inside business websites
    getMessageFromJibres();
  }
  else
  {
    // inside jibres
    setTimeout(() => {
      console.log('post data to iframe fn');
      const myLivePreview = document.getElementById('liveIframe');
      postMsg(myLivePreview, {a1:1, a2:2});
    }, 1000);
  }





}


function getMessageFromJibres()
{
  window.addEventListener('message', _event =>
  {
    // (_event.origin.startsWith('https://jibres.com'))

    console.log(_event.data);


  });
}


function postMsg(_iframe, value)
{
  var data = {
    method: 'post'
  };

  if (value) {
    data.value = value;
  }
  if(data)
  {
    var msg = JSON.stringify(data);
    if(_iframe)
    {
      var targetOrigin = $(_iframe).attr('src');
      _iframe.contentWindow.postMessage(msg, targetOrigin);
    }
  }
}

