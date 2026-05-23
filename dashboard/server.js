require('dotenv').config();
const express = require('express');
const path = require('path');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const app = express();
const PORT = process.env.PORT || 3000;

const ga = new BetaAnalyticsDataClient({ keyFilename: process.env.GA4_KEY_FILE });
const prop = () => `properties/${process.env.GA4_PROPERTY_ID}`;

function auth(req, res, next) {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (pw && req.headers['x-dashboard-password'] !== pw) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/stats', auth, async (req, res) => {
  const days = [7, 30, 90].includes(+req.query.days) ? +req.query.days : 7;
  const range = { startDate: `${days}daysAgo`, endDate: 'today' };

  try {
    const [summary, daily, countries] = await Promise.all([
      ga.runReport({
        property: prop(),
        dateRanges: [range],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      }),
      ga.runReport({
        property: prop(),
        dateRanges: [range],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      ga.runReport({
        property: prop(),
        dateRanges: [range],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 10,
      }),
    ]);

    res.json({
      visitors: +summary[0].rows?.[0]?.metricValues?.[0]?.value || 0,
      pageviews: +summary[0].rows?.[0]?.metricValues?.[1]?.value || 0,
      daily: (daily[0].rows || []).map(r => ({
        date: r.dimensionValues[0].value,
        visitors: +r.metricValues[0].value,
      })),
      countries: (countries[0].rows || []).map(r => ({
        name: r.dimensionValues[0].value,
        count: +r.metricValues[0].value,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Analytics fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Dashboard: http://localhost:${PORT}`));
