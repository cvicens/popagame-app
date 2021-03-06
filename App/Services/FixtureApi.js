export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  fetchEvent: (country, city) => {
    return new Promise((resolve, reject) => {
      resolve ({
        ok: true,
        data: require('../Fixtures/events.json')
      });
    });
  },
  fetchRanking: (eventId) => {
    return new Promise((resolve, reject) => {
      resolve ({
        ok: true,
        data: require('../Fixtures/ranking.json')
      });
    });
  }
}
