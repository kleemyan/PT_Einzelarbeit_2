import db from '$lib/db.js';

export const actions = {
    create: async ({ request }) => {
        try {
            // Formulardaten abrufen
            const formData = await request.formData();
            console.log("Form data received:", [...formData.entries()]);

            // Daten aus dem Formular extrahieren
            const trip = {
                title: formData.get('title'), // Titel des Trips
                destination: formData.get('destination'), // Reiseziel
                start_date: formData.get('start_date'), // Startdatum
                end_date: formData.get('end_date'), // Enddatum
            };
            console.log("Trip data:", trip);

            // Trip in der Datenbank erstellen
            const tripId = await db.createTrip(trip);
            console.log("Trip created with ID:", tripId);

            // Sicherstellen, dass tripId verfügbar ist
            if (!tripId) {
                console.error("Trip ID is undefined. Cannot create activities.");
                return {
                    success: false,
                    error: 'Trip could not be created.',
                };
            }

            // Aktivitäten extrahieren
            const activities = [];
            const entries = [...formData.entries()];
            console.log("FormData entries:", entries);

            entries.forEach(([key, value]) => {
                const match = key.match(/^activities\[(\d+)\]\[(name|location|description)\]$/);
                if (match) {
                    const [, index, field] = match;
                    if (!activities[index]) activities[index] = {}; // Initialisiere Aktivität
                    activities[index][field] = value; // Füge Daten hinzu
                }
            });
            console.log("Extracted activities:", activities);

            // Aktivitäten dem Trip hinzufügen
            for (const activity of activities) {
                if (activity.name && activity.location && activity.description) {
                    const activityWithTripId = { ...activity, tripId }; // tripId explizit hinzufügen
                    console.log("Adding activity with tripId:", activityWithTripId);

                    const activityId = await db.createActivity(activityWithTripId);
                    console.log("Activity added with ID:", activityId);

                    if (!activityId) {
                        return {
                            success: false,
                            error: `Activity "${activity.name}" could not be created.`,
                        };
                    }
                } else {
                    console.warn("Incomplete activity data:", activity);
                }
            }

            // Erfolgsmeldung zurückgeben
            return {
                success: true,
                tripId,
            };

        } catch (err) {
            console.error("Error during trip creation:", err);
            return {
                success: false,
                error: 'An unexpected error occurred. Please try again.',
            };
        }
    },
};











