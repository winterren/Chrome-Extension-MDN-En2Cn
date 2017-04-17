var id = chrome.contextMenus.create({"title": "使用mdn搜索", "contexts":["selection"],
                                       "onclick": genericOnClick});

function genericOnClick(info) {
	var url = "https://developer.mozilla.org/zh-CN/search?q="+info.selectionText;
  	chrome.tabs.create({"url":url});
}

chrome.omnibox.onInputEntered.addListener(function(text) {
	var url = "https://developer.mozilla.org/zh-CN/search?q="+text;
  	chrome.tabs.create({"url":url});
});