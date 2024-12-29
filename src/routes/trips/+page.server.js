import db from '$lib/db.js';

export async function load() {
  return {
    trips: await db.getTrips()
  }
}
