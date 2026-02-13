# Google Scholar FLP Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Walid-AL-SHAAR/google-scholar-flp-calculator/releases)

A Chrome browser extension that calculates the "First-author Leadership Publication (FLP) Index" for Google Scholar profiles to quantify independent research leadership and detect productivity inflation through authorship manipulation.

---

## 📊 What is the FLP Index?

The FLP Index is a novel bibliometric indicator designed to address the widespread problem of "honorary authorship" where researchers are listed as authors despite negligible intellectual contributions. Studies show honorary authorship occurs in 18-51% of publications depending on measurement approach.

### Formula

```
FLP = N × (F%)²
```

Where:
- N = Total peer-reviewed publications
- F% = First-authorship proportion (as decimal: 0.60 for 60%)

### Why Quadratic Weighting?

The quadratic (squared) weighting creates powerful incentive structures:

1. Penalizes Honorary Authorship: A researcher with 100 publications but only 20% first-authorship gets FLP = 4.0, comparable to someone with just 10 publications at 60% first-authorship (FLP = 3.6)

2. Rewards Independent Research: Each first-authored paper contributes (F%)² to your score, while non-first-authored papers can actually decrease FLP when they lower your first-authorship percentage

3. Differentiates Patterns: Researchers with identical first-author output but different total publication patterns receive dramatically different FLP scores, revealing potential productivity inflation

### Example Comparison

| Researcher Profile   | Total Pubs | First-Author % | FLP Score |
|----------------------|------------|----------------|-----------|
| Focused Scholar      | 35         | 85.7%          | 25.7      |
| Balanced Researcher  | 60         | 50.0%          | 15.0      |
| Honorary Accumulator | 120        | 25.0%          | 7.5       |
| Extreme Inflator     | 200        | 15.0%          | 4.5       |
      
Note: All have exactly 30 first-authored publications, yet FLP scores range from 4.5 to 25.7*

---

## ✨ Features

- ✅ Automatic Article Loading: Programmatically clicks "Show more" until ALL publications are loaded—no manual clicking required
- ✅ Intelligent Name Matching: Advanced algorithms detect first authorship across name variations, initials, and formatting differences
- ✅ Precise Calculations: First-authorship percentage displayed as decimal (0.00-1.00) with quadratic weighting
- ✅ Comprehensive Results: Shows total publications, first-author count, percentage, and final FLP score
- ✅ Visual Formula: Displays the actual calculation for transparency
- ✅ Real-Time Progress: Loading indicator shows article count as they're retrieved
- ✅ Global Support: Works on 50+ international Google Scholar domains
- ✅ Privacy-First: No data collection, no external servers, all processing happens locally in your browser

---

## 🚀 Installation

Option 1: From Chrome Web Store (Recommended):

1- Visit the Chrome Web Store listing
2- Click "Add to Chrome"
3- Click "Add extension" in the popup
4- The extension is now installed and ready to use!


Option 2: From ZIP File (For Testing/Development):

1. Download the latest release from the [Releases](https://github.com/Walid-AL-SHAAR/google-scholar-flp-calculator/releases) page
2. Extract the ZIP file to a folder on your computer
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable Developer Mode (toggle in top-right corner)
5. Click "Load unpacked"
6. Select the extracted folder
7. The extension is now installed! 

---

## 📖 How to Use

1. Navigate to any Google Scholar author profile page
   - Example: `https://scholar.google.com/citations?user=XXXXXXX`

2. Click the "📊 Calculate FLP Factor" button
   - Button appears below the citation metrics section

3. Wait while the extension automatically loads all articles
   - Progress indicator shows: "Loading articles... (47 loaded)"
   - Can take 10-30 seconds for profiles with many publications

4. View comprehensive results in the interactive panel:
   - Profile author name
   - Total publication count (N)
   - First-author publication count
   - First-authorship percentage (F% as decimal)
   - FLP Index score
   - Calculation formula with your specific values

5. Close the panel by clicking the × button

---


### The Problem

Honorary authorship violates research integrity through:
- Gift authorship: Names added based on relationships rather than contribution
- Coercive authorship: Power differentials forcing authorship inclusion  
- Honorary authorship: Senior faculty added despite minimal involvement

Traditional metrics (total publications, h-index, citations) fail to detect this because they ignore authorship position, inadvertently rewarding productivity inflation.

### The Solution

The FLP Index creates structural disincentives against honorary authorship by:
1. Heavily weighting first-authorship through quadratic function
2. Making honorary middle-authorships decrease your score
3. Rewarding sustained independent research leadership

---

## 📊 Interpreting FLP Scores

### Typical Values by Career Stage

Early-Career (PhD Students, Postdocs)
- High FLP (15-25): Strong independent research development
- Moderate FLP (8-15): Balanced collaboration and independence
- Low FLP (<8): May indicate excessive reliance on supervisor-led projects

Mid-Career (Assistant/Associate Professors)
- High FLP (20-35): Sustained independent research leadership
- Moderate FLP (12-20): Healthy mix of independent and collaborative work
- Low FLP (<12): Possible over-collaboration or mentorship role

Senior Faculty (Full Professors)
- FLP naturally declines as mentorship roles increase
- Last-authorship becomes more relevant (not measured by FLP)

### Important Caveats

⚠️ DO NOT use FLP in fields with:
- Alphabetical authorship conventions (economics, some mathematics)
- Equal contribution norms (high-energy physics)
- Non-positional authorship cultures

⚠️ FLP is a supplementary metric, not a replacement for:
- Citation analysis
- Journal impact assessment
- Peer review evaluation
- Contribution statements
- Qualitative assessment

---

## ⚖️ Limitations & Responsible Use

### Fundamental Limitations

1. Quality Blindness: Treats all publications equally regardless of journal prestige or citation impact
2. Context Dependency: Authorship position meaning varies across disciplines, institutions, and career stages
3. Collaborative Work: May undervalue legitimate collaborative contributions in team science

### Responsible Use Guidelines

✅ DO:
- Use as one component of multidimensional evaluation
- Consider disciplinary context and career stage
- Allow researchers to explain authorship patterns
- Combine with qualitative assessment

❌ DON'T:
- Use as sole criterion for hiring/promotion decisions
- Apply mechanistically without context
- Use in inappropriate disciplines
- Ignore legitimate collaborative work

---

## 🐛 Troubleshooting

### Extension doesn't appear on Google Scholar
- Ensure you're on a profile page (URL contains `/citations?user=`)
- Refresh the page after installing
- Check extension is enabled in `chrome://extensions/`

### Button doesn't appear
- Wait 2-3 seconds for page to fully load
- Try refreshing the page
- Check browser console for errors (F12 → Console)

### Percentage shows 0.00
- Open browser console (F12) to see debug information
- Check that profile author name is detected correctly
- Verify articles are being loaded (watch progress indicator)

### Loading takes too long
- Normal for profiles with 100+ publications
- Each batch loads ~20 articles
- If stuck >2 minutes, refresh and try again

---

## 👨‍🔬 Author

Dr. Walid Al-Shaar  

---

## 📚 Citation

If you use this tool in your research or find it helpful, please cite:

```bibtex
@software{alshaar2026flp,
  author = {Al-Shaar, Walid},
  title = {Google Scholar FLP Calculator: Browser Extension for Computing First-author Leadership Publication Index},
  year = {2026},
  publisher = {GitHub},
  url = {https://github.com/Walid-AL-SHAAR/google-scholar-flp-calculator}
}
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with 📊 for research integrity**
