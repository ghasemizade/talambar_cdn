
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

  $("[data-postMsg-href]").on('click.postMsg', function(_e){
    var opt = {
      type: 'href',
      href: $(this).attr('data-postMsg-href')
    };

    postMsg(postMsgCompany(this), opt);
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
    getMessageFromIframe();

    // inside jibres
    setTimeout(() => {
      var myLiveIframe = document.getElementById('liveIframe');
      postMsg(myLiveIframe, {a1:1, a2:2});
    }, 1000);
  }
}


function getMessageFromJibres()
{
  window.addEventListener('message', _event =>
  {
    // (_event.origin.startsWith('https://jibres.com'))
    var response = JSON.parse(_event.data);

    if(response && response.value && response.value.type === 'focus')
    {
      if(response.value.el)
      {
        var focusEl = $('#' + response.value.el);
        $('[data-type][data-focus]').attr('data-focus', 'no');
        focusEl.attr('data-focus', 'yes');

        scrollSmooth(focusEl);
      }
    }

  });
}


function getMessageFromIframe()
{
  window.addEventListener('message', _event =>
  {
    console.log(_event.origin);
    // if(_event.origin.startsWith('https://jibres.com'))
    var response = JSON.parse(_event.data);

    if(response && response.value && response.value.type === 'href')
    {
      if(response.value.href)
      {
        Navigate({ url: response.value.href });
      }
    }
  });
}


function postMsgCompany(_this)
{
  var type = $(_this).attr('data-postMsg');
  if(type === 'parent')
  {
    return 'parent';
  }
  else if(type === 'liveIframe')
  {
    return document.getElementById('liveIframe');
  }

  return null;
}


function postMsg(_to, _value)
{
  var data = {
    method: 'post'
  };

  if (_value) {
    data.value = _value;
  }
  if(data)
  {
    var msg = JSON.stringify(data);
    if(_to)
    {
      if(_to === 'parent')
      {
        window.parent.postMessage(msg, "*");
      }
      else
      {
        var targetOrigin = $(_to).attr('src');
        _to.contentWindow.postMessage(msg, targetOrigin);
      }
    }
  }
}

