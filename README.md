# Portfolio

Portfolio và CV của Trần Ngọc Minh Thông — Flutter Mobile & Full-stack Developer.

- Site: https://tranngocminhthong.github.io/Portfolio/
- CV online: https://tranngocminhthong.github.io/Portfolio/cv.html
- CV PDF: `assets/TranNgocMinhThong-CV-EN.pdf`, `assets/TranNgocMinhThong-CV-VI.pdf`

## Cấu trúc

- `index.html` + `portfolio-app.jsx` + `portfolio.css` — portfolio React (Babel in-browser), song ngữ VI/EN, dark/light.
- `cv.html` — CV song ngữ, có nút in / lưu PDF; CSS `@media print` nằm cuối `<style>` để ghi đè rule màn hình.
- `.github/workflows/deploy-pages.yml` — deploy GitHub Pages mỗi khi push lên `main`.

## Xuất lại PDF CV

Mở `cv.html`, chọn ngôn ngữ, bấm **Print / Save as PDF** (A4, không header/footer). Hoặc dùng puppeteer-core với Chrome có sẵn:

```js
const page = await browser.newPage();
await page.goto("http://localhost:8765/cv.html", { waitUntil: "networkidle0" });
await page.evaluate(() => document.querySelector('[data-set-lang="en"]').click());
await page.emulateMediaType("print");
await page.pdf({ path: "assets/TranNgocMinhThong-CV-EN.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
```
