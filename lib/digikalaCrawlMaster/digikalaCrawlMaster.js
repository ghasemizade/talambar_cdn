
function runDigiKalaCrawlMaster()
{
  $('[data-digikala-crawl]').each(function()
  {
    var $showEl = $(this);

    // get data from digikala and convert it to array
    searchResult = readDigiKalaList($showEl.attr('data-digikala-crawl'), $showEl);
  });
}



function readDigiKalaList(_q, _target)
{
  // site that doesn’t send Access-Control-*
  var searchUrl      = "https://www.digikala.com/search/?q=" + _q;
  // https://cors-anywhere.herokuapp.com/https://example.com
  var dgUrl    = "https://cors-anywhere.herokuapp.com/" + searchUrl;

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
      logy('parser is not defined!');
      return false;
    }

    var doc = parser.parseFromString(html, 'text/html');
    if(!doc)
    {
      logy('doc is not recognized');
      return false;
    }

    var myProductList = $(doc).find('.c-listing__items .c-product-box');
    if(!myProductList)
    {
      logy('list is empty');
      return false;
    }



    var myResult = {};

    myProductList.each(function(index)
    {
      var myItem = {};
      var $this  = $(this);
      // read values
      myItem.title          = $this.find('.c-product-box__title a').text();
      myItem.unit           = $this.find('.c-price .c-price__value-wrapper .c-price__currency').text();
      myItem.price          = $this.find('.c-price .c-price__value-wrapper').text().replace(myItem.unit, '').trim();
      myItem.compareAtPrice = $this.find('.c-price del').text();
      myItem.img            = $this.find('.c-product-box__img img').attr('src');

      myResult[index] = myItem;
    });

    // try to create element to show data
    if(_target)
    {
      createProductListElement(myResult, _target);
    }

    return myResult;

  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong on catch data.', err);
  });
}


function createProductListElement(_datalist, _target)
{
  if(!_datalist)
  {
    logy('digikala data list is null');
    return false;
  }
  if(!_target)
  {
    logy('target to show digikala converted list is empty');
    return false;
  }

  $.each( _datalist, function( key, item)
  {
    {
      // create product Element
      newEl  = "<div class='c-2'>";
      {
        newEl += "<div class='jProduct2' data-data='" + '{"url":"' + item.img + '"}' + "'>";
        {
          newEl += "<figure class='overlay'>"
          {
            newEl += '<img src=' + item.img + ' alt="poof">'
            newEl += "<footer>";
            {
              newEl += "<figcaption>" + item.title + "</figcaption>";
              newEl += "<div class='f align-center'>"
              if(item.unit)
              {
                newEl += "<span class='unit cauto'>" + item.unit + "</span>";
              }
              if(item.price)
              {
                newEl += "<span class='price c'>"+ item.price +"</span>";
              }
              if(item.CompareAtPrice)
              {
                newEl += "<del class='compareAtPrice cauto os'>" + item.CompareAtPrice +"</del>";
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

      _target.append(newEl);
    }
  });
}
