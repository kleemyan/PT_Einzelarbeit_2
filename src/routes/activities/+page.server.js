import db from '$lib/db.js';

export async function load() {
  const activities = await db.getActivities();
  return { activities };
}
