const TARGET_CLASSES = "taskboard-row empty";

(
  function() { 
    function getDomain(url) { try { return new URL(url).origin; } catch (e) { return null; } }

    const currentDomain = getDomain(window.location.href);

    function hideElements() { 
      const toHide = document.querySelectorAll(`div.${TARGET_CLASSES.split(" ").join(".")}`); 
      toHide.forEach(el => {el.style.display = 'none' }); 
    }

    function showElements() { 
      const toHide = document.querySelectorAll(`div.${TARGET_CLASSES.split(" ").join(".")}`); 
      toHide.forEach(el => { el.style.display = '' }); 
    }

    browser.runtime.onMessage.addListener((message) => { 
      if (message.type === "TOGGLE_ELEMENTS") { 
        if (message.enabled) { 
          hideElements(); 
        } else { 
          showElements(); 
        } 
      } 
    }); 
  }
)();
