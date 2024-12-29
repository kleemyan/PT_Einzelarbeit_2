import db from "$lib/db.js";
import { error } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      
      // Hole die Trip-Daten aus dem Formular
      const title = formData.get("title");
      const destination = formData.get("destination");
      const start_date = formData.get("start_date");
      const end_date = formData.get("end_date");

      // Validierung der Trip-Daten
      if (!title || !destination || !start_date || !end_date) {
        throw error(400, "Alle Felder für den Trip sind erforderlich!");
      }

      // Erstelle den Trip
      const tripId = await db.createTrip({
        title,
        destination,
        start_date,
        end_date,
        activities: [] // Platzhalter für Aktivitäten
      });

      // Verknüpfe Aktivitäten, falls welche angegeben wurden
      const activityNames = formData.getAll("activity_name");
      const activityLocations = formData.getAll("activity_location");
      const activityDescriptions = formData.getAll("activity_description");

      for (let i = 0; i < activityNames.length; i++) {
        const activity = {
          name: activityNames[i],
          location: activityLocations[i],
          description: activityDescriptions[i],
        };
        await db.createActivity(activity, tripId); // Verknüpft die Aktivität mit dem Trip
      }

      return { success: true, tripId };
    } catch (err) {
      console.error("Fehler beim Erstellen eines Trips oder einer Aktivität:", err.message);
      throw error(500, "Interner Serverfehler");
    }
  }
};


