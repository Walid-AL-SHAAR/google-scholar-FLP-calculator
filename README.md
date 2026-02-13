# Google Scholar FLP Calculator Extension

A Chrome extension that calculates the **First-Author Leadership Productivity (FLP) Factor** for Google Scholar profiles.

## What is the FLP Factor?

The FLP Factor is a metric that measures research leadership by combining:
- **Percentage of first-author publications** (leadership indicator)
- **Total publication output** (productivity indicator)

**Scientific Foundation:**

This extension implements the FLP Index as described in:

Al-Shaar, W. (2026). "First-author Leadership Publication (FLP) Index: A Bibliometric Approach to Detecting Authorship Integrity Violations."

The metric addresses documented problems with honorary authorship—where researchers are listed as authors despite negligible contributions—which has been shown to occur in 18-51% of publications depending on measurement approach (Meursinge Reynders et al., 2024).

### Formula

```
FLP Factor = N × (F% as decimal)²
```

Where:
- N = total peer-reviewed publications
- F% = first-authorship proportion (expressed as decimal, e.g., 0.60 for 60%)

This quadratic weighting gives higher scores to researchers who frequently publish as first authors while substantially discounting honorary authorships that inflate publication counts without corresponding intellectual contribution.

## Features

- ✅ **Automatically loads ALL articles** - no manual clicking needed
- ✅ Automatically detects Google Scholar profile pages
- ✅ Calculates total articles and first-author articles
- ✅ Computes first-author percentage
- ✅ Calculates FLP Factor with the formula: (%)² × Total Articles
- ✅ Beautiful, easy-to-read results panel with loading indicator
- ✅ Works on any Google Scholar profile
- ✅ One-click calculation with progress tracking

## Installation

### Method 1: Load Unpacked Extension (Development Mode)

1. **Download the extension files** to a folder on your computer

2. **Open Chrome Extensions page**:
   - Go to `chrome://extensions/` in your Chrome browser
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

5. **Pin the extension** (optional):
   - Click the puzzle icon in the Chrome toolbar
   - Find "Google Scholar FLP Calculator"
   - Click the pin icon to keep it visible

## How to Use

1. **Navigate to a Google Scholar profile**:
   - Go to https://scholar.google.com
   - Search for an author or visit any profile page
   - Example: `https://scholar.google.com/citations?user=XXXXXXXX`

2. **Calculate FLP Factor**:
   - Look for the **"📊 Calculate FLP Factor"** button below the profile information
   - Click the button
   - The extension will **automatically load all articles** (no need to manually click "Show more")
   - A loading indicator will show progress as articles are loaded

3. **View results**:
   - After all articles are loaded and analyzed, a results panel will appear showing:
     - Profile author name
     - Total articles count
     - First-author articles count
     - First-author percentage
     - **FLP Factor** (highlighted)
     - Calculation formula

4. **Close the panel**:
   - Click the × button in the top-right of the results panel

## Understanding the Results

### Example Output

```
Profile: Dr. John Smith
Total Articles: 50
First Author Articles: 30
First Author %: 0.60
FLP Factor: 18.00

Formula: (0.60)² × 50 = 18.00
```

### Interpretation

- **High FLP Factor** = High leadership (first authorship) + High productivity
- A researcher with 0.60 (60%) first-author rate and 50 total articles has an FLP of 18.00
- A researcher with 0.40 (40%) first-author rate and 100 total articles has an FLP of 16.00
- The squared decimal rewards research leadership more heavily

## Technical Details

### Files Structure

```
scholar-flp-extension/
├── manifest.json       # Extension configuration
├── content.js         # Main calculation logic
├── style.css          # Styling for UI elements
├── popup.html         # Extension popup interface
├── icon16.png         # Extension icon (16×16)
├── icon48.png         # Extension icon (48×48)
├── icon128.png        # Extension icon (128×128)
└── README.md          # This file
```

### How It Works

1. **Content Script Injection**: The extension injects `content.js` into Google Scholar profile pages
2. **Automatic Article Loading**: Programmatically clicks "Show more" button until all articles are visible
3. **Author Detection**: Extracts the profile author's name from the page
4. **Article Analysis**: Iterates through all visible articles and checks author order
5. **Name Matching**: Uses fuzzy matching to handle variations in author names
6. **Calculation**: Computes percentage and FLP factor using the formula
7. **Display**: Renders a beautiful results panel on the page

### Supported Google Scholar Domains

- scholar.google.com
- scholar.google.co.uk
- scholar.google.ca
- All other international Google Scholar domains

## Limitations

- Author name matching is based on text comparison (handles most common variations)
- Does not distinguish between co-first authors
- Very long publication lists may take a few seconds to load completely
- Requires stable internet connection for loading all articles

## Privacy

This extension:
- ✅ Only runs on Google Scholar pages
- ✅ Does not collect or transmit any data
- ✅ Does not require any special permissions beyond reading the current page
- ✅ All calculations happen locally in your browser

## Troubleshooting

### Extension doesn't appear on Google Scholar
- Make sure you're on a profile page (URL should contain `/citations?user=`)
- Refresh the page after installing the extension
- Check that the extension is enabled in `chrome://extensions/`

### Button doesn't appear
- Wait a few seconds for the page to fully load
- Try refreshing the page
- Make sure Developer Mode is enabled

### Loading takes too long
- The extension automatically loads all articles, which may take time for profiles with many publications
- Wait for the loading indicator to complete
- If it seems stuck, refresh the page and try again

### Inaccurate results
- The extension automatically loads all articles before calculation
- Some articles may have non-standard author formatting
- Very similar names might cause false positives/negatives

### Panel doesn't display
- Check browser console for errors (F12 → Console tab)
- Try disabling other extensions that might conflict
- Refresh the page and try again

## Future Enhancements

Potential features for future versions:
- Export results to CSV/PDF
- Batch analysis of multiple profiles
- Historical tracking of FLP factor over time
- Comparison between multiple researchers
- Co-authorship network visualization
- Support for h-index correlation

## Version History

**v1.0** (2026-02-12)
- Initial release
- Basic FLP factor calculation
- First-author percentage analysis
- **Automatic article loading** - no manual "Show more" clicking required
- Clean UI with results panel
- Loading progress indicator

## Support

For issues, suggestions, or contributions:
- Check the troubleshooting section above
- Review Chrome extension documentation
- Ensure you're using the latest version of Chrome

## License

This extension is provided as-is for academic and research purposes.

---

**Developed for researchers to quantify research leadership and productivity.**
