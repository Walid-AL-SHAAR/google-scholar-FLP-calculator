// Content script for Google Scholar FLP Calculator

(function() {
  'use strict';

  // Function to extract author name from profile
  function getProfileAuthorName() {
    const nameElement = document.querySelector('#gsc_prf_in');
    return nameElement ? nameElement.textContent.trim() : null;
  }

  // Function to normalize author names for comparison
  function normalizeAuthorName(name) {
    // Remove extra spaces, convert to lowercase, remove periods and special characters
    return name.toLowerCase()
      .trim()
      .replace(/\./g, '')
      .replace(/,/g, '')
      .replace(/\s+/g, ' ')
      .replace(/-/g, ' ');
  }

  // Function to extract last name from full name
  function getLastName(fullName) {
    const parts = fullName.trim().split(/\s+/);
    return parts[parts.length - 1];
  }

  // Function to get initials from name
  function getInitials(name) {
    return name.split(/\s+/)
      .map(part => part[0])
      .filter(Boolean)
      .join('')
      .toLowerCase();
  }

  // Function to check if the profile author is the first author
  function isFirstAuthor(authorsText, profileAuthorName) {
    if (!authorsText || !profileAuthorName) return false;
    
    // Split authors by comma
    const authors = authorsText.split(',');
    if (authors.length === 0) return false;
    
    // Get first author
    const firstAuthor = authors[0].trim();
    
    // Normalize both names
    const normalizedFirst = normalizeAuthorName(firstAuthor);
    const normalizedProfile = normalizeAuthorName(profileAuthorName);
    
    // Strategy 1: Exact match after normalization
    if (normalizedFirst === normalizedProfile) {
      return true;
    }
    
    // Strategy 2: Check if one contains the other
    if (normalizedFirst.includes(normalizedProfile) || normalizedProfile.includes(normalizedFirst)) {
      return true;
    }
    
    // Strategy 3: Compare last names
    const firstAuthorLastName = normalizeAuthorName(getLastName(firstAuthor));
    const profileLastName = normalizeAuthorName(getLastName(profileAuthorName));
    
    if (firstAuthorLastName === profileLastName) {
      // Last names match, now check if initials match
      const firstAuthorInitials = getInitials(normalizedFirst);
      const profileInitials = getInitials(normalizedProfile);
      
      // Check if initials are compatible (one is subset of other)
      if (firstAuthorInitials.includes(profileInitials.substring(0, 1)) || 
          profileInitials.includes(firstAuthorInitials.substring(0, 1))) {
        return true;
      }
    }
    
    // Strategy 4: Check for reversed name order (Last, First vs First Last)
    const reversedFirst = firstAuthor.split(/\s+/).reverse().join(' ');
    const normalizedReversed = normalizeAuthorName(reversedFirst);
    
    if (normalizedReversed === normalizedProfile || normalizedProfile === normalizedReversed) {
      return true;
    }
    
    return false;
  }

  // Function to automatically load all articles
  async function loadAllArticles(progressCallback) {
    return new Promise((resolve) => {
      const checkAndClick = () => {
        const showMoreBtn = document.querySelector('#gsc_bpf_more');
        
        // Check if button exists and is enabled
        if (showMoreBtn && !showMoreBtn.disabled) {
          // Get current article count before clicking
          const currentCount = document.querySelectorAll('.gsc_a_tr').length;
          
          // Update progress
          if (progressCallback) {
            progressCallback(`Loading articles... (${currentCount} loaded)`);
          }
          
          // Click the button
          showMoreBtn.click();
          
          // Wait a bit for new articles to load, then check again
          setTimeout(checkAndClick, 800);
        } else {
          // No more articles to load or button is disabled
          resolve();
        }
      };
      
      // Start the process
      checkAndClick();
    });
  }

  // Function to analyze articles
  function analyzeArticles() {
    const profileAuthor = getProfileAuthorName();
    if (!profileAuthor) {
      console.log('Could not find profile author name');
      return null;
    }

    console.log('Profile Author:', profileAuthor);

    // Get all article rows
    const articleRows = document.querySelectorAll('.gsc_a_tr');
    
    if (articleRows.length === 0) {
      console.log('No articles found');
      return null;
    }

    let totalArticles = 0;
    let firstAuthorArticles = 0;
    let debugInfo = [];

    articleRows.forEach((row, index) => {
      // Get the authors element
      const authorsElement = row.querySelector('.gs_gray');
      
      if (authorsElement) {
        const authorsText = authorsElement.textContent;
        totalArticles++;
        
        const isFirst = isFirstAuthor(authorsText, profileAuthor);
        
        // Debug: Log first few articles
        if (index < 5) {
          console.log(`Article ${index + 1}:`, {
            authors: authorsText,
            firstAuthor: authorsText.split(',')[0],
            isFirstAuthor: isFirst
          });
        }
        
        if (isFirst) {
          firstAuthorArticles++;
          if (debugInfo.length < 3) {
            debugInfo.push(authorsText.split(',')[0]);
          }
        }
      }
    });

    console.log('Analysis complete:', {
      totalArticles,
      firstAuthorArticles,
      sampleFirstAuthorNames: debugInfo
    });

    // Calculate percentage as decimal (0.00 to 1.00)
    const percentageDecimal = totalArticles > 0 ? (firstAuthorArticles / totalArticles) : 0;
    
    // Calculate FLP factor: (decimal)² × Total Articles
    const flpFactor = Math.pow(percentageDecimal, 2) * totalArticles;

    return {
      totalArticles,
      firstAuthorArticles,
      percentage: percentageDecimal.toFixed(2),
      flpFactor: flpFactor.toFixed(2),
      profileAuthor
    };
  }

  // Function to create and display the results panel
  function displayResults(results) {
    // Remove existing panel if it exists
    const existingPanel = document.getElementById('flp-calculator-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    // Create results panel
    const panel = document.createElement('div');
    panel.id = 'flp-calculator-panel';
    panel.className = 'flp-panel';
    
    panel.innerHTML = `
      <div class="flp-header">
        <h3>📊 FLP Calculator Results</h3>
        <button id="flp-close-btn" class="flp-close">×</button>
      </div>
      <div class="flp-content">
        <div class="flp-author">
          <strong>Profile:</strong> ${results.profileAuthor}
        </div>
        <div class="flp-metric">
          <span class="flp-label">Total Articles:</span>
          <span class="flp-value">${results.totalArticles}</span>
        </div>
        <div class="flp-metric">
          <span class="flp-label">First Author Articles:</span>
          <span class="flp-value">${results.firstAuthorArticles}</span>
        </div>
        <div class="flp-metric">
          <span class="flp-label">First Author %:</span>
          <span class="flp-value">${results.percentage}</span>
        </div>
        <div class="flp-metric flp-highlight">
          <span class="flp-label">FLP Factor:</span>
          <span class="flp-value">${results.flpFactor}</span>
        </div>
        <div class="flp-formula">
          Formula: (${results.percentage})² × ${results.totalArticles} = ${results.flpFactor}
        </div>
        <div style="margin-top: 10px; text-align: center; font-size: 11px; color: #999;">
          <a href="https://github.com/Walid-AL-SHAAR/google-scholar-FLP-calculator" target="_blank" style="color: #667eea; text-decoration: none;">About this extension</a>
        </div>
      </div>
    `;

    // Insert panel into page
    const profileSection = document.querySelector('#gsc_prf');
    if (profileSection) {
      profileSection.parentNode.insertBefore(panel, profileSection.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    // Add close button functionality
    document.getElementById('flp-close-btn').addEventListener('click', () => {
      panel.remove();
    });
  }

  // Function to show loading panel
  function showLoadingPanel(message) {
    // Remove existing panel if it exists
    const existingPanel = document.getElementById('flp-calculator-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    const panel = document.createElement('div');
    panel.id = 'flp-calculator-panel';
    panel.className = 'flp-panel';
    
    panel.innerHTML = `
      <div class="flp-header">
        <h3>📊 FLP Calculator</h3>
        <button id="flp-close-btn" class="flp-close">×</button>
      </div>
      <div class="flp-content">
        <div class="flp-loading">
          <div class="flp-spinner"></div>
          <div id="flp-loading-message">${message}</div>
        </div>
      </div>
    `;

    // Insert panel into page
    const profileSection = document.querySelector('#gsc_prf');
    if (profileSection) {
      profileSection.parentNode.insertBefore(panel, profileSection.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    // Add close button functionality
    document.getElementById('flp-close-btn').addEventListener('click', () => {
      panel.remove();
    });

    return panel;
  }

  // Function to update loading message
  function updateLoadingMessage(message) {
    const messageElement = document.getElementById('flp-loading-message');
    if (messageElement) {
      messageElement.textContent = message;
    }
  }

  // Function to add calculate button
  function addCalculateButton() {
    // Check if button already exists
    if (document.getElementById('flp-calculate-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.id = 'flp-calculate-btn';
    button.className = 'flp-calculate-button';
    button.innerHTML = '📊 Calculate FLP Factor';
    
    button.addEventListener('click', async () => {
      // Disable button during calculation
      button.disabled = true;
      button.innerHTML = '⏳ Calculating...';
      
      try {
        // Show loading panel
        showLoadingPanel('Initializing...');
        
        // First, automatically load all articles
        await loadAllArticles((progress) => {
          updateLoadingMessage(progress);
        });
        
        // Update loading message
        updateLoadingMessage('Analyzing articles...');
        
        // Small delay to let the final articles render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Analyze the articles
        const results = analyzeArticles();
        
        if (results) {
          displayResults(results);
        } else {
          alert('Unable to analyze articles. Please make sure you are on a Google Scholar profile page with visible articles.');
          const panel = document.getElementById('flp-calculator-panel');
          if (panel) panel.remove();
        }
      } catch (error) {
        console.error('Error calculating FLP:', error);
        alert('An error occurred during calculation. Please try again.');
        const panel = document.getElementById('flp-calculator-panel');
        if (panel) panel.remove();
      } finally {
        // Re-enable button
        button.disabled = false;
        button.innerHTML = '📊 Calculate FLP Factor';
      }
    });

    // Create a container for better placement
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'flp-button-container';
    buttonContainer.style.cssText = 'margin: 20px 0; text-align: left;';
    buttonContainer.appendChild(button);

    // Try multiple placement strategies
    // Strategy 1: After the citation indices section
    const citationIndices = document.querySelector('#gsc_rsb_st');
    if (citationIndices) {
      citationIndices.parentNode.insertBefore(buttonContainer, citationIndices.nextSibling);
      return;
    }

    // Strategy 2: Before the articles table
    const articlesTable = document.querySelector('#gsc_a_t');
    if (articlesTable) {
      articlesTable.parentNode.insertBefore(buttonContainer, articlesTable);
      return;
    }

    // Strategy 3: After the profile section (fallback)
    const profileSection = document.querySelector('#gsc_prf_pua');
    if (profileSection) {
      profileSection.appendChild(buttonContainer);
      return;
    }

    // Strategy 4: Append to body as last resort
    document.body.appendChild(buttonContainer);
  }

  // Initialize when page loads
  function init() {
    // Wait a bit for the page to fully load
    setTimeout(() => {
      addCalculateButton();
    }, 1000);
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also add observer for dynamic content loading
  const observer = new MutationObserver(() => {
    if (!document.getElementById('flp-calculate-btn')) {
      addCalculateButton();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
