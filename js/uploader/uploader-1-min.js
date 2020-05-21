
function runUploader()
{
  console.log('run uploader');
  // define variables
  var myUploaderFrame = $('[data-uploader]');
  var myInput = $('[data-uploader] input[type="file"]');
  var myLabel = $('[data-uploader] input[type="file"] + label');
  var droppedFiles = false;



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
    console.log(_files);
    // set default if is not set
    if(!_label.prop('defaultText'))
    {
      _label.prop('defaultText', _label.html());
    }

    var labelText = "";
    var fileSize = false;
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
      if(_files[0].size)
      {
        fileSize = _files[0].size;
      }
    }
    else
    {
      labelText = _label.prop('defaultText');
    }

    _label.html(labelText);
    if(fileSize && fileSize > 0)
    {
      fileSize = Math.round(fileSize/1024);
      _label.attr('data-file-size', fileSize + ' KB');
    }
    else
    {
      _label.attr('data-file-size', null);
    }
  }


  function startCropProcess(_files)
  {
    setInputText(_files, myInput, myLabel);
    cropFullScreen();
  }



  // catch file change manually
  myInput.off('change').on('change', function(_e)
  {
    startCropProcess(_e.target.files)
  })
  // catch drop file
  myUploaderFrame.off('drop').on('drop', function(_e)
  {
    // set dropped files to use on form submit
    droppedFiles = _e.originalEvent.dataTransfer.files;
    startCropProcess(droppedFiles)
  });


  function setDropEffect(dataTransfer, effect)
  {
    // is in try catch as IE11 will throw error if not
    try {
      dataTransfer.effectAllowed = effect;
      dataTransfer.dropEffect = effect;
    } catch (e) {}
  };

  // on dragover show class
  [ 'dragover', 'dragenter' ].forEach( function( _event )
  {
    $(document).off(_event).on(_event, function(_e)
    {
      myDataTransfer = _e.originalEvent.dataTransfer;

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
      // preventing the unwanted behaviours
      _e.preventDefault();
      _e.stopPropagation();
      myUploaderFrame.attr('data-dragover', null);
    });
  });

  function setFiles()
  {
      if( droppedFiles )
      {
        Array.prototype.forEach.call( droppedFiles, function( file )
        {
          ajaxData.append( input.getAttribute( 'name' ), file );
        });
      }
  }






}



function cropFullScreen()
{

  say({
    title: "",
    html: '<div class="cropBox"><img src="" alt="cropBox"></div>',
    focusConfirm: false,
    showConfirmButton: false,
    showCloseButton:true,
    grow: "fullscreen",
    showCancelButton: false
  }).then((result) =>
  {
    console.log(result);
    if (result.value)
    {
      say(
      {
        type: 'success',
        html: myLogoutTxt,
        showConfirmButton: false,
        timer: 1000,
        onClose: () =>
        {
          location.replace(myLogouturl);
        }
      });

    }
    else if (result.dismiss === alerty.DismissReason.cancel)
    {
      // do nothing
    }
  });
}

