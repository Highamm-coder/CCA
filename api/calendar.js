export default async function handler(req, res) {
  const ICS_URL = 'https://calendar.google.com/calendar/ical/ma7m909q4huvqedci3fbl1u6rg%40group.calendar.google.com/public/basic.ics';
  try {
    const upstream = await fetch(ICS_URL);
    if (!upstream.ok) {
      return res.status(502).send('Failed to fetch calendar');
    }
    const text = await upstream.text();
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(text);
  } catch (e) {
    res.status(502).send('Calendar unavailable');
  }
}
