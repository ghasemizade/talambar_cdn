
function handleFocusModePushState()
{

  $('#sidebar .items[data-postMsg] .item').on('mouseenter.liveIframeSelect', function(_a){
    var myId = $(this).attr('id');
    var myLiveIframe = document.getElementById('liveIframe');

    postMsg(myLiveIframe, {type:'focus', el:myId});

  }).on('mouseleave.liveIframeSelect', function(_b){
    var myId = $(this).attr('id');
    var myLiveIframe = document.getElementById('liveIframe');

    postMsg(myLiveIframe, {type:'blur', el:myId});
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
      var myLiveIframe = document.getElementById('liveIframe');
      console.log('post data to iframe fn');
      postMsg(myLiveIframe, {a1:1, a2:2});
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

