var transBtn = document.getElementById('translate');
var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');


// 搜索
function search(){
  if(searchInput.value==""){
    return false;
  }
  var url = "https://developer.mozilla.org/zh-CN/search?q="+searchInput.value;
  chrome.tabs.create({"url":url});
  searchInput.value="";
}
searchBtn.addEventListener('click',search);
searchInput.addEventListener('keyup',function(e){
  if(e.keyCode == 13){
    search();
  }
})

// 翻译
transBtn.addEventListener('click',function(){
  //因为是在popup中调用tab，只能query查询
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var oldURL = tab.url;
      var newURL;
      var pattern = /en-US/i;
      var patternMDN = /mozilla/;

      if(pattern.test(oldURL)&&patternMDN.test(oldURL)){
        newURL = oldURL.replace(pattern,'zh-CN');
        console.log(newURL);
        console.log(tab.windowId);
        console.log("tabid"+tab.id);
        // chrome.tabs.create({"url":newURL});
        chrome.tabs.update(tab.id,{"url":newURL});
      }else{
        // 不合法
        var warning = document.getElementById("warning");
        warning.style.visibility="visible";
        warning.style.opacity="1";
        var timer = setTimeout(function(){
          warning.style.visibility="hidden";
          warning.style.opacity="0";
        },1800)
      }
  });
})