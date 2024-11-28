chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "highlightShare",
    title: "生成分享卡片",
    contexts: ["selection", "image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "highlightShare") {
    chrome.tabs.sendMessage(tab.id, {
      action: "createCard",
      selection: info.selectionText,
      imageUrl: info.srcUrl
    });
  }
});

// 处理下载请求
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadCard') {
    chrome.downloads.download({
      url: request.dataUrl,
      filename: request.filename,
      saveAs: true
    });
  }
});
