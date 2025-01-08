export const calculateIdeologyStats = (parties) => {
  return Object.entries(
    parties.reduce((acc, party) => {
      acc[party.ideology] = (acc[party.ideology] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));
};

export const calculateTimelineStats = (parties) => {
  return parties.reduce((acc, party) => {
    const decade = Math.floor(party.yearFounded / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {});
};

export const calculateCountryStats = (parties) => {
  return parties.reduce((acc, party) => {
    acc[party.country] = (acc[party.country] || 0) + 1;
    return acc;
  }, {});
};