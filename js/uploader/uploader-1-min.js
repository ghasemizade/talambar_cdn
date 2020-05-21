
function runUploader()
{
  console.log('run uploader');
  // define variables
  var myUploaderFrame = $('[data-uploader]');
  var myInput = $('[data-uploader] input[type="file"]')
  var myLabel = $('[data-uploader] input[type="file"] + label')


  // check advance upload is enable or not
  // function isAdvancedUpload(_el)
  // {
  //   return ( ('draggable' in _el ) || ( 'ondragstart' in _el && 'ondrop' in _el ) ) && 'FormData' in window && 'FileReader' in window;
  // }

  // if(!isAdvancedUpload(myUploaderFrame))
  // {
  //   console.log('Advance upload features is not enable on browser.');
  //   return false;
  // }

  // show file Content
  function setInputText(_files, _input, _label)
  {
    // set default if is not set
    if(!_label.prop('defaultText'))
    {
      _label.prop('defaultText', _label.html());
    }

    var labelText = "";
    if(_files.length > 1)
    {
      multipleCaption = _input.getAttribute( 'data-multiple-caption') || '{count} files selected';
      labelText = multipleCaption.replace( '{count}', _files.length );
    }
    else if(_files.length === 1)
    {
      if(_files[0].name)
      {
        labelText = _files[0].name;
      }
      else
      {
        labelText = "File Without Name!";
      }
    }
    else
    {
      labelText = _label.prop('defaultText');
    }

    _label.html(labelText);
  }


  myInput.off('change').on('change', function(_e){
    setInputText(_e.target.files, this, myLabel)
  })


}
