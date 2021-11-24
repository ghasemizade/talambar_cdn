
function handleFocusMode()
{

  if(urlJibres('zone') === 'business-website')
  {
    // inside business websites
    console.log(119);
  }
  else
  {
    // inside jibres
    setTimeout(() => {
      console.log('post data to iframe fn');
      const myLivePreview = document.getElementById('liveIframe');
      postMsg(myLivePreview, 'post', {a1:1, a2:2});
    }, 1000);
  }


// console.log(frame);
// if(frame)
// {
//     console.log(77);
//     setTimeout(() => {
//       console.log("this is the first message");
//       console.log(78);
//       frame.contentWindow.postMessage("GetWhiteLabel","*");
//       // frame.contentWindow.postMessage("GetWhiteLabel", event.origin);

//       frame.contentWindow.postMessage("GetWhiteLabel","http://rafiee.myjibres.local");
//       frame.contentWindow.postMessage(123, 'http://rafiee.myjibres.local?preview=22ac3ee75b504f055a9f5c24b581969e');

//     }, 1000);
// }


window.addEventListener('message', event => {
  console.log(66);
    // IMPORTANT: check the origin of the data!
    if (event.origin.startsWith('http://jibres.local/$jb2mz/site/page?id=ym')) {
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
        console.log(event.data);
    } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
    }
});

}


function postMsg(_iframe, action, value)
{
  var data = {
    method: action
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

