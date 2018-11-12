const puppeteer = require('puppeteer');
const folder = '2018-11-06';

const PAGES = [
    // HOMEPAGES
    { 'name': 'npr', 'url': 'https://www.npr.org' },
    { 'name': 'npr-liveblog', 'url': 'https://www.npr.org/2018/11/06/650521908/election-night-2018-live' },
    { 'name': 'nyt', 'url': 'https://www.nytimes.com' },
    { 'name': 'wapo', 'url': 'https://www.washingtonpost.com' },
    { 'name': 'cnn', 'url': 'https://www.cnn.com' },
    { 'name': 'latimes', 'url': 'https://www.latimes.com' },
    { 'name': 'wsj', 'url': 'https://www.wsj.com' },
    { 'name': 'guardian', 'url': 'https://www.theguardian.com/us' },
    { 'name': 'fox', 'url': 'https://www.foxnews.com' },
    // { 'name': 'politico', 'url': 'https://www.politico.com' },
    { 'name': 'nbc', 'url': 'https://www.nbcnews.com' },
    { 'name': 'abc', 'url': 'https://abcnews.go.com' },
    { 'name': 'bostonglobe', 'url': 'https://www.bostonglobe.com' },
    { 'name': 'huffpo', 'url': 'https://www.huffingtonpost.com' },
    // { 'name': 'chicagotribune', 'url': 'https://www.chicagotribune.com' },
    // { 'name': 'wbez', 'url': 'https://www.wbez.org' },
    // { 'name': 'wamu', 'url': 'https://wamu.org' },
    // { 'name': 'wnyc', 'url': 'https://www.wnyc.org' },
    // { 'name': 'stlouis', 'url': 'http://news.stlpublicradio.org' },
    { 'name': '538', 'url': 'https://fivethirtyeight.com' },
    { 'name': 'vox', 'url': 'https://www.vox.com' },
    { 'name': 'bloomberg', 'url': 'https://www.bloomberg.com' },
    { 'name': 'newshour', 'url': 'https://www.pbs.org/newshour/' },

    // LIVEBLOGS
    { 'name': 'wapo-liveblog', 'url': 'https://www.washingtonpost.com/politics/2018/live-updates/midterms/midterm-election-updates/' },
    { 'name': 'wsj-liveblog', 'url': 'https://www.wsj.com/livecoverage/2018-midterms-live-elections-coverage-analysis' },
    { 'name': 'politico-liveblog', 'url': 'https://www.politico.com/election-results/2018/election-day-live-updates-analysis/nov-6/' },

    // RESULTS
    { 'name': 'nyt-results', 'url': 'https://www.nytimes.com/interactive/2018/11/06/us/elections/results-house-elections.html' },
    { 'name': 'nyt-model-house', 'url': 'https://www.nytimes.com/interactive/2018/11/06/us/elections/results-house-forecast.html' },
    { 'name': 'nyt-model-senate', 'url': 'https://www.nytimes.com/interactive/2018/11/06/us/elections/results-senate-forecast.html' },
    { 'name': 'politico-results-ga', 'url': 'https://www.politico.com/election-results/2018/georgia/' },
    { 'name': 'wapo-results-house', 'url': 'https://www.washingtonpost.com/election-results/house/' },
    { 'name': 'wapo-results-senate', 'url': 'https://www.washingtonpost.com/election-results/senate/' },
    // { 'name': 'cnn-results', 'url': 'http://www.cnn.com/specials/politics/super-tuesday-2016' },
    // { 'name': 'latimes-results', 'url': 'http://graphics.latimes.com/2016-election-march-15-results/' },
    // { 'name': 'wsj-results', 'url': 'http://graphics.wsj.com/elections/2016/march-15/' },
    { 'name': 'guardian-results', 'url': 'https://www.theguardian.com/us-news/ng-interactive/2018/nov/06/midterm-elections-2018-live-results-latest-winners-and-seats' },
    // { 'name': 'huffpo-results', 'url': 'http://elections.huffingtonpost.com/2016/primaries/2016-03-15' },
    // { 'name': 'politico-results', 'url': 'http://www.politico.com/2016-election/results/map/president/south-carolina' },
    // { 'name': 'nbc-results', 'url': 'http://www.nbcnews.com/politics/2016-election/primaries' },
    // { 'name': 'bostonglobe-results', 'url': 'https://apps.bostonglobe.com/election-results/2016/index.html#calendar?p1=BG_super_tuesday_desktop_link' },
    // { 'name': 'wbez-results', 'url': 'https://www.wbez.org/shows/wbez-news/2016-illinois-primary-election-results/e50cb21d-26b1-47ef-9097-9357121c9061' },
    // { 'name': 'newshour-results', 'url': 'http://www.pbs.org/newshour/data/election-calendar/' },
    { 'name': 'vox-results', 'url': 'https://www.vox.com/a/midterms-2018/' }
];

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '-')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});
new Promise((_, reject) => reject({ test: 'woops!' })).catch(() => {});

(async () => {
  var timestamp = (new Date()).toLocaleString();
  timestamp = slugify(timestamp);

  for (site in PAGES) {
      console.log(PAGES[site]);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(PAGES[site]['url']);

      await page.on('error', err => {
          console.log(err);
          exit;
      })

      await page.setViewport({ width: 1600, height: 3200 });
      await page.waitFor(2000);
      await page.screenshot({ path: folder + '/' + PAGES[site]['name'] + '-' + timestamp + '.png', fullPage: true });
      await page.setViewport({ width: 400, height: 1600, hasTouch: true, isMobile: true });
      await page.screenshot({ path: folder + '/' + PAGES[site]['name'] + '-mobile-' + timestamp + '.png', fullPage: true });
      await browser.close();
  }
})();
