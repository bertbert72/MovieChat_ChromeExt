function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.includes(".imdb.")){
      imdbId = /tt\d{7}|nm\d{7}/.exec(url);
	  //imdbId = /ch\d{7}|co\d{7}|ev\d{7}|nm\d{7}|tt\d{7}|ni\d{7}\d{7}/.exec(url);
      if(imdbId!=null){
        chrome.tabs.query({
         active: true
        }, tabs => {
          var index = tabs[0].index;
          //renderStatus('index:' + index);
          var newURL = "https://moviechat.org/"+imdbId;
          chrome.tabs.create({ url: newURL, index: index + 1 });
        })
      } else {
        renderStatus('Cannot find a movie on this page');
      }
    } else {
      renderStatus('Not an IMDB page');
    }
  });
});
