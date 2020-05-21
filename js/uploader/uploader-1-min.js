
function runUploader()
{
  console.log('run uploader');
  // define variables
  var myUploaderFrame = $('[data-uploader]');
  var myInput = $('[data-uploader] input[type="file"]')


  // check advance upload is enable or not
  var isAdvancedUpload = function(_el)
  {
    return ( ( 'draggable' in _el ) || ( 'ondragstart' in _el && 'ondrop' in _el ) ) && 'FormData' in window && 'FileReader' in window;
  }();

  if(!isAdvancedUpload(myUploaderFrame))
  {
    console.log('Advance upload features is not enable on browser.');
    return false;
  }


  myInput.off('change').on('change', function(_e){
    console.log(_e);
    console.log(_e.target.files);
  })


}
