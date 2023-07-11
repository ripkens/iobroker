const axios = require('axios');

const rssFeedUrl = 'https://www.tagesschau.de/api2/news/?regions=10'; // Replace with your RSS feed URL
const dataPointId = '0_userdata.0.RSS.tagesschau'; // Replace with your data point ID

createState(dataPointId, "[]", true, {"type" : "text"}, null);

async function fetchRssFeed() {
  try {
    const response = await axios.get(rssFeedUrl);
    const feedItems = response.data.news.slice(0, 100); // Get the latest 10 items
    const jsonData = JSON.stringify(feedItems);
    await setObject(dataPointId, jsonData);
    console.log('RSS feed fetched and saved successfully.');
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    CreateEventlog("Info", error);
  }
}

fetchRssFeed();

schedule('*/15 * * * *', function () {fetchRssFeed();})

// Helper function to save data point
function setObject(id, value) {
  return new Promise((resolve, reject) => {
    setState(id, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
