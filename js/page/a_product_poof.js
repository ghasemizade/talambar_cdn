
function pageScript()
{
  var $showEl = $('#poofImageFetch');
  var myTitle = $showEl.attr('data-title');

  $q = myTitle;
  // https://cors-anywhere.herokuapp.com/https://example.com
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  // site that doesn’t send Access-Control-*
  var url      = "https://www.digikala.com/search/?q=" + $q;
  var dgUrl    = proxyurl + url;

  fetch(dgUrl).then(function (response)
  {
    // The API call was successful!
    return response.text();
  }).then(function (html)
  {
    // Convert the HTML string into a document object
    var parser = new DOMParser();
    var doc    = parser.parseFromString(html, 'text/html');
    var images = $(doc).find('.c-listing__items .js-product-item img');
    var mySrc, myTitle, myPrice, compareAtPrice, data, myEl;


    images.each(function(index) {
      var mySrc = $(this).attr('src');
      if(mySrc)
      {
        data = '{"url":"' + mySrc + '"}';

        // create product Element
        myEl  = "<div class='c-2'>";
        {
          myEl += "<div class='jProduct2' data-data='" + data + "'>";
          {
            myEl += "<figure class='overlay'>"
            {
              myEl += '<img src=' + mySrc + ' alt="poof">'
              myEl += "<footer>";
              {
                myEl += "<figcaption>" + myTitle + "</figcaption>";
                myEl += "<div class='f align-center'>"
                myEl += "<span class='unit cauto'></span>";
                myEl += "<span class='price c'>"+ myPrice +"</span>";
                myEl += "<del class='compareAtPrice cauto os'>" + compareAtPrice +"</del>";
                myEl += "</div>"
              }
              myEl += "</footer>";
            }

            myEl += '</figure>';
          }
          myEl += '</div>';
        }
        myEl += '</div>';

        $showEl.append(myEl);
      }
    });
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}
