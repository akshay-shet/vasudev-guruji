# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> no serious or critical axe violations on /kundali-matching
- Location: tests/e2e/a11y.spec.ts:8:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "scrollable-region-focusable: .overflow-x-auto",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - link "Skip to content" [ref=e3] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - generic [ref=e5]:
      - button "Open menu" [ref=e6] [cursor=pointer]
      - link "Vasudev Guruji — home" [ref=e9] [cursor=pointer]:
        - /url: /
        - generic [ref=e19]: Vasudev Guruji
      - button "Language and theme" [ref=e21] [cursor=pointer]:
        - generic [ref=e22]: EN
  - main [ref=e25]:
    - generic [ref=e27]:
      - generic [ref=e29]:
        - generic [ref=e30]: ಗುಣ ಮಿಲನ
        - generic [ref=e32]: GUNA MILAN
      - heading "Kundali Matching ಕುಂಡಲಿ ಹೊಂದಾಣಿಕೆ" [level=1] [ref=e33]:
        - generic [ref=e34]:
          - text: Kundali Matching
          - generic [ref=e35]: ಕುಂಡಲಿ ಹೊಂದಾಣಿಕೆ
    - generic [ref=e42]:
      - generic [ref=e44]:
        - generic [ref=e45]: ಲೆಕ್ಕಾಚಾರ
        - generic [ref=e47]: CALCULATOR
      - heading "Guna Milan Calculator ಗುಣ ಮಿಲನ ಲೆಕ್ಕಾಚಾರ" [level=2] [ref=e48]:
        - generic [ref=e49]:
          - text: Guna Milan Calculator
          - generic [ref=e50]: ಗುಣ ಮಿಲನ ಲೆಕ್ಕಾಚಾರ
      - generic [ref=e56]:
        - group "Boy" [ref=e57]:
          - generic [ref=e59]: Janma Nakshatra (Moon)
          - combobox "Janma Nakshatra (Moon)" [ref=e60]:
            - option "Ashwini — ಅಶ್ವಿನೀ"
            - option "Bharani — ಭರಣೀ"
            - option "Krittika — ಕೃತ್ತಿಕಾ"
            - option "Rohini — ರೋಹಿಣೀ" [selected]
            - option "Mrigashira — ಮೃಗಶಿರಾ"
            - option "Ardra — ಆರ್ದ್ರಾ"
            - option "Punarvasu — ಪುನರ್ವಸು"
            - option "Pushya — ಪುಷ್ಯ"
            - option "Ashlesha — ಆಶ್ಲೇಷಾ"
            - option "Magha — ಮಘಾ"
            - option "Purva Phalguni — ಪೂರ್ವ ಫಾಲ್ಗುನೀ"
            - option "Uttara Phalguni — ಉತ್ತರ ಫಾಲ್ಗುನೀ"
            - option "Hasta — ಹಸ್ತ"
            - option "Chitra — ಚಿತ್ರಾ"
            - option "Swati — ಸ್ವಾತಿ"
            - option "Vishakha — ವಿಶಾಖಾ"
            - option "Anuradha — ಅನುರಾಧಾ"
            - option "Jyeshtha — ಜ್ಯೇಷ್ಠಾ"
            - option "Mula — ಮೂಲ"
            - option "Purva Ashadha — ಪೂರ್ವಾಷಾಢ಼ಾ"
            - option "Uttara Ashadha — ಉತ್ತರಾಷಾಢ಼ಾ"
            - option "Shravana — ಶ್ರವಣ"
            - option "Dhanishta — ಧನಿಷ್ಠಾ"
            - option "Shatabhisha — ಶತಭಿಷಾ"
            - option "Purva Bhadrapada — ಪೂರ್ವ ಭಾದ್ರಪದ"
            - option "Uttara Bhadrapada — ಉತ್ತರ ಭಾದ್ರಪದ"
            - option "Revati — ರೇವತೀ"
          - generic [ref=e61]: Pada
          - combobox "Pada" [ref=e62]:
            - option "Pada 1"
            - option "Pada 2" [selected]
            - option "Pada 3"
            - option "Pada 4"
          - paragraph [ref=e63]: "Moon sign: Vrishabha (Taurus)"
        - group "Girl" [ref=e64]:
          - generic [ref=e66]: Janma Nakshatra (Moon)
          - combobox "Janma Nakshatra (Moon)" [ref=e67]:
            - option "Ashwini — ಅಶ್ವಿನೀ"
            - option "Bharani — ಭರಣೀ"
            - option "Krittika — ಕೃತ್ತಿಕಾ"
            - option "Rohini — ರೋಹಿಣೀ"
            - option "Mrigashira — ಮೃಗಶಿರಾ"
            - option "Ardra — ಆರ್ದ್ರಾ"
            - option "Punarvasu — ಪುನರ್ವಸು"
            - option "Pushya — ಪುಷ್ಯ"
            - option "Ashlesha — ಆಶ್ಲೇಷಾ"
            - option "Magha — ಮಘಾ"
            - option "Purva Phalguni — ಪೂರ್ವ ಫಾಲ್ಗುನೀ"
            - option "Uttara Phalguni — ಉತ್ತರ ಫಾಲ್ಗುನೀ"
            - option "Hasta — ಹಸ್ತ" [selected]
            - option "Chitra — ಚಿತ್ರಾ"
            - option "Swati — ಸ್ವಾತಿ"
            - option "Vishakha — ವಿಶಾಖಾ"
            - option "Anuradha — ಅನುರಾಧಾ"
            - option "Jyeshtha — ಜ್ಯೇಷ್ಠಾ"
            - option "Mula — ಮೂಲ"
            - option "Purva Ashadha — ಪೂರ್ವಾಷಾಢ಼ಾ"
            - option "Uttara Ashadha — ಉತ್ತರಾಷಾಢ಼ಾ"
            - option "Shravana — ಶ್ರವಣ"
            - option "Dhanishta — ಧನಿಷ್ಠಾ"
            - option "Shatabhisha — ಶತಭಿಷಾ"
            - option "Purva Bhadrapada — ಪೂರ್ವ ಭಾದ್ರಪದ"
            - option "Uttara Bhadrapada — ಉತ್ತರ ಭಾದ್ರಪದ"
            - option "Revati — ರೇವತೀ"
          - generic [ref=e68]: Pada
          - combobox "Pada" [ref=e69]:
            - option "Pada 1" [selected]
            - option "Pada 2"
            - option "Pada 3"
            - option "Pada 4"
          - paragraph [ref=e70]: "Moon sign: Kanya (Virgo)"
      - generic [ref=e71]:
        - paragraph [ref=e72]: TOTAL GUNAS
        - paragraph [ref=e73]: 25 / 36
        - paragraph [ref=e74]: Very good match
        - paragraph [ref=e77]: Bhakoot Dosha present. Classical texts list exceptions (cancellations) — please consult Guruji for a full analysis.
      - table [ref=e79]:
        - rowgroup [ref=e80]:
          - row [ref=e81]:
            - columnheader "Koota" [ref=e82]
            - columnheader "Details" [ref=e83]
            - columnheader "Area" [ref=e84]
            - columnheader "Score" [ref=e85]
        - rowgroup [ref=e86]:
          - row [ref=e87]:
            - cell "Varna" [ref=e88]
            - cell "Boy Vaishya · Girl Vaishya" [ref=e89]
            - cell "Spiritual compatibility and ego" [ref=e90]
            - cell "1 / 1" [ref=e91]
          - row [ref=e92]:
            - cell "Vashya" [ref=e93]
            - cell "Boy Chatushpada · Girl Manava" [ref=e94]
            - cell "Mutual attraction and influence" [ref=e95]
            - cell "1 / 2" [ref=e96]
          - row [ref=e97]:
            - cell "Tara" [ref=e98]
            - cell "Count girl→boy 19, boy→girl 10" [ref=e99]
            - cell "Health, well-being and destiny" [ref=e100]
            - cell "3 / 3" [ref=e101]
          - row [ref=e102]:
            - cell "Yoni" [ref=e103]
            - cell "Boy Serpent · Girl Buffalo" [ref=e104]
            - cell "Physical and intimate harmony" [ref=e105]
            - cell "2 / 4" [ref=e106]
          - row [ref=e107]:
            - cell "Graha Maitri" [ref=e108]
            - cell "Lords Venus & Mercury" [ref=e109]
            - cell "Mental compatibility and friendship" [ref=e110]
            - cell "5 / 5" [ref=e111]
          - row [ref=e112]:
            - cell "Gana" [ref=e113]
            - cell "Boy Manushya · Girl Deva" [ref=e114]
            - cell "Temperament and nature" [ref=e115]
            - cell "5 / 6" [ref=e116]
          - row [ref=e117]:
            - cell "Bhakoot" [ref=e118]
            - cell "Moon signs Vrishabha & Kanya (9/5)" [ref=e119]
            - cell "Love, family welfare and prosperity" [ref=e120]
            - cell "0 / 7" [ref=e121]
          - row [ref=e122]:
            - cell "Nadi" [ref=e123]
            - cell "Boy Antya · Girl Adi" [ref=e124]
            - cell "Health and progeny (most important)" [ref=e125]
            - cell "8 / 8" [ref=e126]
      - paragraph [ref=e127]: Educational calculator using standard tables (Yoni scoring simplified). Mangal Dosha, Navamsha and dasha compatibility are checked in Guruji’s full reading.
    - generic [ref=e128]:
      - generic [ref=e129]:
        - generic [ref=e131]:
          - generic [ref=e132]: ಎಂಟು ಕೂಟಗಳು
          - generic [ref=e134]: 8 KOOTAS
        - heading "The Ashtakoota ಅಷ್ಟಕೂಟ" [level=2] [ref=e135]:
          - generic [ref=e136]:
            - text: The Ashtakoota
            - generic [ref=e137]: ಅಷ್ಟಕೂಟ
        - paragraph [ref=e143]: Total 36 gunas. 18+ is generally acceptable; 25+ is very good; Nadi and Bhakoot doshas need special attention.
      - generic [ref=e144]:
        - generic [ref=e145]:
          - generic [ref=e146]:
            - heading "1. Varna" [level=3] [ref=e147]
            - generic [ref=e148]: "1"
          - paragraph [ref=e149]: Spiritual compatibility & ego — based on the Moon sign’s varna.
        - generic [ref=e150]:
          - generic [ref=e151]:
            - heading "2. Vashya" [level=3] [ref=e152]
            - generic [ref=e153]: "2"
          - paragraph [ref=e154]: Mutual attraction & control — based on the Moon sign’s category.
        - generic [ref=e155]:
          - generic [ref=e156]:
            - heading "3. Tara" [level=3] [ref=e157]
            - generic [ref=e158]: "3"
          - paragraph [ref=e159]: Health & destiny — count of nakshatras between the two.
        - generic [ref=e160]:
          - generic [ref=e161]:
            - heading "4. Yoni" [level=3] [ref=e162]
            - generic [ref=e163]: "4"
          - paragraph [ref=e164]: Physical & intimate harmony — the animal nature of each nakshatra.
        - generic [ref=e165]:
          - generic [ref=e166]:
            - heading "5. Graha Maitri" [level=3] [ref=e167]
            - generic [ref=e168]: "5"
          - paragraph [ref=e169]: Mental wavelength — friendship of the Moon-sign lords.
        - generic [ref=e170]:
          - generic [ref=e171]:
            - heading "6. Gana" [level=3] [ref=e172]
            - generic [ref=e173]: "6"
          - paragraph [ref=e174]: Temperament — Deva, Manushya or Rakshasa nature.
        - generic [ref=e175]:
          - generic [ref=e176]:
            - heading "7. Bhakoot" [level=3] [ref=e177]
            - generic [ref=e178]: "7"
          - paragraph [ref=e179]: Love, family welfare & prosperity — distance between Moon signs.
        - generic [ref=e180]:
          - generic [ref=e181]:
            - heading "8. Nadi" [level=3] [ref=e182]
            - generic [ref=e183]: "8"
          - paragraph [ref=e184]: Health & progeny — the three doshas Adi, Madhya, Antya.
    - generic [ref=e187]:
      - heading "Request a full Kundali Matching" [level=3] [ref=e188]
      - generic [ref=e194]:
        - generic [ref=e195]:
          - generic [ref=e196]: Name *
          - textbox "Name *" [ref=e197]
        - generic [ref=e198]:
          - generic [ref=e199]: Phone / WhatsApp *
          - textbox "Phone / WhatsApp *" [ref=e200]
        - generic [ref=e201]:
          - generic [ref=e202]: Topic *
          - combobox "Topic *" [ref=e203]:
            - option "Online Consultation"
            - option "Horoscope Reading"
            - option "Vedic Astrology"
            - option "Live Chat & Call"
            - option "Career & Job"
            - option "Love & Relationships"
            - option "Marriage Matching" [selected]
            - option "Business & Finance"
            - option "Wealth & Property"
            - option "Health & Well-being"
            - option "Gemstone Recommendation"
            - option "Life Problems"
            - option "Black Magic Removal"
            - option "Vastu"
            - option "Homa"
            - option "Other"
        - generic [ref=e204]:
          - generic [ref=e205]: Birth date
          - textbox "Birth date" [ref=e206]
        - generic [ref=e207]:
          - generic [ref=e208]: Birth time
          - textbox "Birth time" [ref=e209]
        - generic [ref=e210]:
          - generic [ref=e211]: Birth place
          - textbox "Birth place" [ref=e212]:
            - /placeholder: City, State, Country
        - generic [ref=e213]:
          - generic [ref=e214]: Your question
          - textbox "Your question" [ref=e215]
        - button "Send on WhatsApp" [ref=e217] [cursor=pointer]
  - contentinfo [ref=e220]:
    - generic [ref=e221]:
      - generic [ref=e222]:
        - generic [ref=e223]: Vasudev Guruji
        - paragraph [ref=e235]: ॥ ಲೋಕಾಃ ಸಮಸ್ತಾಃ ಸುಖಿನೋ ಭವನ್ತು ॥
      - generic [ref=e236]:
        - heading "Contact" [level=4] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - link "+91 90359 59911" [ref=e242] [cursor=pointer]:
              - /url: tel:+919035959911
          - listitem [ref=e243]:
            - link "WhatsApp +91 90359 59911" [ref=e246] [cursor=pointer]:
              - /url: https://wa.me/919035959911?text=%F0%9F%99%8F%20Hari%20Om
          - listitem [ref=e247]:
            - link "srivasudevguruji@gmail.com" [ref=e251] [cursor=pointer]:
              - /url: mailto:srivasudevguruji@gmail.com
          - listitem [ref=e252]:
            - generic [ref=e256]: Near Sri Nimishambha Temple Dasoha Bhavan, Ganjam, Srirangapatna, Mandya District, Karnataka 571438, India
        - button "Night" [ref=e257] [cursor=pointer]
    - generic [ref=e260]:
      - generic [ref=e261]:
        - link "Privacy Policy" [ref=e262] [cursor=pointer]:
          - /url: /legal/privacy
        - link "Terms & Conditions" [ref=e263] [cursor=pointer]:
          - /url: /legal/terms
        - link "Disclaimer" [ref=e264] [cursor=pointer]:
          - /url: /legal/disclaimer
      - paragraph [ref=e265]: © 2026 Vasudev Guruji. All rights reserved. · Astrology guidance is not a substitute for medical, legal or financial advice.
  - generic [ref=e266]:
    - button "Open chat" [ref=e267] [cursor=pointer]
    - link "Call +91 90359 59911" [ref=e271] [cursor=pointer]:
      - /url: tel:+919035959911
    - link "Chat on WhatsApp" [ref=e274] [cursor=pointer]:
      - /url: https://wa.me/919035959911?text=%F0%9F%99%8F%20Hari%20Om%20Guruji%2C%20I%20would%20like%20to%20make%20an%20enquiry.
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  | import { ROUTES, settle } from './helpers'
  4  | 
  5  | // WCAG 2.2 A/AA automated checks (axe-core). Automated tools catch roughly a third of issues;
  6  | // keyboard and screen-reader passes are still needed — see PRODUCTION_READINESS_REPORT.md.
  7  | for (const path of ROUTES) {
  8  |   test(`no serious or critical axe violations on ${path}`, async ({ page }) => {
  9  |     await page.emulateMedia({ reducedMotion: 'reduce' })
  10 |     await page.goto(path)
  11 |     await settle(page)
  12 |     const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  13 |     const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
> 14 |     expect(bad.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
     |                                                                                                          ^ Error: expect(received).toEqual(expected) // deep equality
  15 |   })
  16 | }
  17 | 
  18 | test('keyboard: skip link is first and moves focus to main', async ({ page }) => {
  19 |   await page.goto('/about')
  20 |   await settle(page)
  21 |   await page.keyboard.press('Tab')
  22 |   const skip = page.getByRole('link', { name: /skip to content/i })
  23 |   await expect(skip).toBeFocused()
  24 |   await page.keyboard.press('Enter')
  25 |   await expect(page).toHaveURL(/#main$/)
  26 | })
  27 | 
  28 | test('focus is visible on interactive elements', async ({ page }) => {
  29 |   await page.goto('/contact')
  30 |   await settle(page)
  31 |   await page.locator('#eq-name').focus()
  32 |   const outline = await page.locator('#eq-name').evaluate((el) => { const s = getComputedStyle(el); return s.outlineStyle !== 'none' || s.boxShadow !== 'none' })
  33 |   expect(outline).toBe(true)
  34 | })
  35 | 
```