function getDomain(url) { 
  try { 
    return new URL(url).origin; 
  } catch (error) { 
    return null; 
  } 
}


function updateIcon(tab, enabled) { 
  const iconPath = enabled ? "icons/enabled_icon.svg" : "icons/default_icon.svg";
  browser.action.setIcon({ path: iconPath, tabId: tab.id }); 
}

browser.action.onClicked.addListener((tab) => { 
  const domain = getDomain(tab.url); 
  if (!domain) { 
    return; 
  }

 browser.storage.local.get(domain).then((result) => { 
    const currentState = result[domain] || false; 
    const newState = !currentState;
    const toSave = {};
    toSave[domain] = newState;
    browser.storage.local.set(toSave).then(() => {
      updateIcon(tab, newState);
      browser.tabs.sendMessage(tab.id, {
        type: "TOGGLE_ELEMENTS",
        enabled: newState
      });
    });
  }); 
});


browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    const domain = getDomain(tab.url); 
    if (!domain) { 
      return; 
    }
    const toSave = {};
    toSave[domain] = false;
    browser.storage.local.set(toSave).then(() => {
      updateIcon(tab, false);
    });
  }
});
