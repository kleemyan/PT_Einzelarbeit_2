import db from "$lib/db.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    // Hole den Trip anhand der ID
    const trip = await db.getTrip(params.trip_id);

    // Falls der Trip nicht existiert, wirf einen 404-Fehler
    if (!trip) {
      throw error(404, "Trip not found");
    }

    return { trip };
  } catch (err) {
    console.error("Fehler beim Laden des Trips:", err.message);
    throw error(500, "Internal Server Error");
  }
}
