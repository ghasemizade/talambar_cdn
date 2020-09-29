
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
    if(!parser)
    {
      console.log('parser is not defined!');
      return false;
    }
    var doc = parser.parseFromString(html, 'text/html');
    if(!doc)
    {
      console.log('doc is not recognized');
      return false;
    }

    var myProductList = $(doc).find('.c-listing__items');
    var eachItem = myProductList.find('.c-product-box');
    // var images = myProductList.find('.js-product-item img');
    var pTitle, pUnit, pPrice, pCompareAtPrice, pImg, data, newEl;



    eachItem.each(function(index)
    {
      $this  = $(this);
      pTitle = $this.find('.c-product-box__title a').text();
      pUnit  = $this.find('.c-price .c-price__value-wrapper .c-price__currency').text();
      pPrice = $this.find('.c-price .c-price__value-wrapper').text().replace(pUnit, '').trim();
      pCompareAtPrice = $this.find('.c-price del').text();

      // pImg = $(this).attr('src');
      pImg = $this.find('.c-product-box__img img').attr('src');

      if(pImg)
      {
        // create product Element
        newEl  = "<div class='c-2'>";
        {
          newEl += "<div class='jProduct2' data-data='" + '{"url":"' + pImg + '"}' + "'>";
          {
            newEl += "<figure class='overlay'>"
            {
              newEl += '<img src=' + pImg + ' alt="poof">'
              newEl += "<footer>";
              {
                newEl += "<figcaption>" + pTitle + "</figcaption>";
                newEl += "<div class='f align-center'>"
                if(pUnit)
                {
                  newEl += "<span class='unit cauto'>" + pUnit + "</span>";
                }
                if(pPrice)
                {
                  newEl += "<span class='price c'>"+ pPrice +"</span>";
                }
                if(pCompareAtPrice)
                {
                  newEl += "<del class='compareAtPrice cauto os'>" + pCompareAtPrice +"</del>";
                }
                newEl += "</div>"
              }
              newEl += "</footer>";
            }

            newEl += '</figure>';
          }
          newEl += '</div>';
        }
        newEl += '</div>';

        $showEl.append(newEl);
      }
    });
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);
  });
}
