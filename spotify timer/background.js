
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pauseSpotify") {
    
    
    chrome.tabs.query({ url: "*://open.spotify.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        
        
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            
            const btn = document.querySelector('[data-testid="control-button-playpause"]');
            
            
            if (btn && btn.getAttribute('aria-label') === 'Pause') {
              btn.click();
              console.log("Spotify berhasil di-pause oleh Timer!");
            } else {
              console.log("Spotify sudah dalam posisi pause atau tombol tidak ditemukan.");
            }
          }
        });
        
      } else {
        console.warn("Tab Spotify tidak ditemukan.");
      }
    });
    
  }
});