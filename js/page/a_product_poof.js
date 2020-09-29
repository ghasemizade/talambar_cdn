
function pageScript()
{
  var $showEl = $('#poofImageFetch');
  var myTitle = $showEl.attr('data-title');

  $q = myTitle;
  // https://cors-anywhere.herokuapp.com/https://example.com
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  // site that doesn’t send Access-Control-*
  var url = "https://www.digikala.com/search/?q=" + $q;

  var dgUrl = proxyurl + url;

  fetch(dgUrl).then(function (response)
  {
    // The API call was successful!
    return response.text();
  }).then(function (html)
  {
    // Convert the HTML string into a document object
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');

    var images = $(doc).find('.c-listing__items .js-product-item img');
    images.each(function(index) {
      var mySrc = $(this).attr('src');
      if(mySrc)
      {
        var data = '{"url":"' + mySrc + '"}';
        var myEl = "<div class='c-2'><img data-ajaxify data-data='" + data + "' src='" + mySrc + "' alt='Auto-" + index +"'></div>";
        $showEl.append(myEl);
      }
      console.log(mySrc);
    });
    console.log(images);
    // Get the image file
    // var img = doc.querySelector('c-listing__items');
    // console.log(img);

  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}
