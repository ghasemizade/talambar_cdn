
function runUploader()
{
  console.log('run uploader');
  var myInput = $('[data-uploader] input[type="file"]')

  myInput.off('change').on('change', function(_e){
    console.log(_e);
    console.log(_e.target.files);
  })


}
