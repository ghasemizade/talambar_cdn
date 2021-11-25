
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
    var to = postMsgCompany(this);
    var opt = {
      type: 'href',
      href: $(this).attr('data-postMsg-href')
    };
    console.log(to);

    postMsg(to, opt);
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
  console.log(4444);
  window.addEventListener('message', _event =>
  {
   console.log(5555);
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


function postMsgCompany(_this)
{
  var type = $(_this).attr('data-postMsg');
  if(type === 'parent')
  {
    return window.parent;
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
      var targetOrigin = $(_to).attr('src');
      // _to.contentWindow.postMessage(msg, targetOrigin);
      _to.contentWindow.postMessage(msg, "*");
    }
  }
}

