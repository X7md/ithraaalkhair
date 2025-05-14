// src/lib/chart-data-processor.ts (or similar path)

export interface RawDataEntry {
  rating: number;
  date: string; // ISO string
  license_no: string;
  center: string;
  latitude?: number; // Optional, not used for chart
  longitude?: number; // Optional, not used for chart
  original_rating_id?: number; // Optional, not used for chart
}

export interface ChartDataPoint {
  name: string; // center ID
  value: number; // average rating percentage
}

// Predefined order for centers on the X-axis
const PREDEFINED_CENTER_ORDER: string[] = [
  '50', '27', '32', '11', '12', '13', '14', '15', '16', '17', '18', '19',
  '20', '22', '23', '24', '25', '26', '28', '29', '30', '31', '33', '34',
  '35', '36', '37', '38', '39', '40', '42', '43'
];

export const processReadinessData = (rawData: RawDataEntry[]): ChartDataPoint[] => {
  if (!rawData || rawData.length === 0) {
    return [];
  }

  // 1. Parse dates and group by center
  const centersData: Record<string, { date: Date; rating: number; license_no: string }[]> = {};
  rawData.forEach(entry => {
    if (!centersData[entry.center]) {
      centersData[entry.center] = [];
    }
    try {
      const entryDate = new Date(entry.date);
      if (isNaN(entryDate.getTime())) {
        console.warn(`Invalid date for entry: ${entry.center} - ${entry.date}`);
        return; // Skip entries with invalid dates
      }
      centersData[entry.center].push({
        date: entryDate,
        rating: entry.rating,
        license_no: entry.license_no,
      });
    } catch (e) {
      console.warn(`Error parsing date for entry: ${entry.center} - ${entry.date}`, e);
    }
  });

  const processedCenters: ChartDataPoint[] = [];

  for (const centerId in centersData) {
    const entries = centersData[centerId];
    if (entries.length === 0) continue;

    // 2. Find the latest date (day) for this center
    let latestDayTimestamp = 0;
    entries.forEach(entry => {
      const entryDay = new Date(entry.date.getFullYear(), entry.date.getMonth(), entry.date.getDate()).getTime();
      if (entryDay > latestDayTimestamp) {
        latestDayTimestamp = entryDay;
      }
    });
    
    // 3. Filter entries by this latest day
    const latestDayEntries = entries.filter(entry => {
        const entryDay = new Date(entry.date.getFullYear(), entry.date.getMonth(), entry.date.getDate()).getTime();
        return entryDay === latestDayTimestamp;
    });

    // 4. For each license_no on that latest day, find the entry with the latest time
    const latestRatingsByLicense: Record<string, { rating: number; date: Date }> = {};
    latestDayEntries.forEach(entry => {
      if (!latestRatingsByLicense[entry.license_no] || entry.date.getTime() > latestRatingsByLicense[entry.license_no].date.getTime()) {
        latestRatingsByLicense[entry.license_no] = {
          rating: entry.rating,
          date: entry.date,
        };
      }
    });

    // 5. Calculate the average rating for the center
    const ratingsToAverage = Object.values(latestRatingsByLicense).map(item => item.rating);
    if (ratingsToAverage.length > 0) {
      const sum = ratingsToAverage.reduce((acc, val) => acc + val, 0);
      const averageRating = sum / ratingsToAverage.length;
      processedCenters.push({ name: centerId, value: parseFloat(averageRating.toFixed(2)) });
    } else {
      // If no valid ratings found for the latest day (e.g., all entries filtered out), assign 0
      processedCenters.push({ name: centerId, value: 0 });
    }
  }

  // 6. Sort the processed centers
  processedCenters.sort((a, b) => {
    const indexA = PREDEFINED_CENTER_ORDER.indexOf(a.name);
    const indexB = PREDEFINED_CENTER_ORDER.indexOf(b.name);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    const numA = parseInt(a.name, 10);
    const numB = parseInt(b.name, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.name.localeCompare(b.name);
  });

  return processedCenters;
};