
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
      multipleCaption = _input.get(0).getAttribute( 'data-multiple-caption') || '{count} files selected';
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


  // catch file change manually
  myInput.off('change').on('change', function(_e)
  {
    setInputText(_e.target.files, myInput, myLabel);
  })
  // catch drop file
  myUploaderFrame.off('drop').on('drop', function(_e)
  {
    myDataTransfer = _e.originalEvent.dataTransfer;
    console.log(myDataTransfer);
    console.log(myDataTransfer.files);
    setInputText(myDataTransfer.files, myInput, myLabel);
  });

  function setDropEffect(dataTransfer, effect)
  {
    // is in try catch as IE11 will throw error if not
    try {
      dataTransfer.effectAllowed = effect;
      dataTransfer.dropEffect = effect;
    } catch (e) {}
  };


  // add drag events
  [ 'drag', 'dragstart'].forEach( function(_event)
  {
    $(document).off(_event).on(_event, function(_e)
    {
      // preventing the unwanted behaviours
      _e.preventDefault();
      _e.stopPropagation();
    });
  });
  // on dragover show class
  [ 'dragover', 'dragenter' ].forEach( function( _event )
  {
    $(document).off(_event).on(_event, function(_e)
    {
      myDataTransfer = _e.originalEvent.dataTransfer;
      // _e.dataTransfer.dropEffect = 'none';
      // add dragging to body
      // if($('body').attr('dragging') !== '')
      // {
      //   $('body').attr('dragging', '');
      // }

      if($(_e.target).parents('[data-uploader]').length)
      {
        setDropEffect(myDataTransfer, 'copy');
        if(myUploaderFrame.attr('data-dragover') !== 'zone')
        {
          myUploaderFrame.attr('data-dragover', 'zone');
        }
      }
      else
      {
        setDropEffect(myDataTransfer, 'none');
        if(myUploaderFrame.attr('data-dragover') !== '')
        {
          myUploaderFrame.attr('data-dragover', '');
        }
      }
      // preventing the unwanted behaviours
      _e.preventDefault();
      _e.stopPropagation();
    });
  });
  // on draglease remvoe class
  [ 'dragleave', 'dragend', 'drop' ].forEach( function( _event )
  {
    $(document).off(_event).on(_event, function(_e)
    {
      // add dragging to body
      // $('body').attr('dragging', null);

      // preventing the unwanted behaviours
      _e.preventDefault();
      _e.stopPropagation();
      myUploaderFrame.attr('data-dragover', null);
    });
  });

}
