chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pauseSpotify") {
    
    // Gunakan URL yang lebih umum untuk mencakup semua sub-halaman Spotify
    chrome.tabs.query({ url: "*://open.spotify.com/*" }, (tabs) => {
      if (tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            // Selector utama yang kita temukan
            const btn = document.querySelector('[data-testid="control-button-playpause"]');
            
            if (btn) {
              const label = btn.getAttribute('aria-label') ? btn.getAttribute('aria-label').toLowerCase() : "";
              
              // Cek apakah tombol saat ini adalah tombol untuk PAUSE (Jeda)
              // Kita cek apakah label mengandung kata 'pause' atau 'jeda'
              if (label.includes('pause') || label.includes('jeda')) {
                btn.click();
                console.log("Spotify paused successfully.");
              } else {
                console.log("Spotify is already paused.");
              }
            } else {
              console.error("Pause button not found. Spotify might not be playing.");
            }
          }
        });
      } else {
        console.warn("Spotify tab not found.");
      }
    });
    
  }
});