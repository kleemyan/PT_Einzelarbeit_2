import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
    return {
        trip: await db.getTrip(params.trip_id),
    };
}

export const actions = {
    update: async ({ request }) => {
        const data = await request.formData();

        let trip = {
            _id: data.get("_id"),
            title: data.get("title"),
            destination: data.get("destination"),
            start_date: data.get("start_date"),
            end_date: data.get("end_date"),
            activities: data.getAll("activity_id").map((id, index) => ({
                _id: id,
                name: data.getAll("activity_name")[index],
                location: data.getAll("activity_location")[index],
                description: data.getAll("activity_description")[index],
            })),
        };

        await db.updateTrip(trip);

        for (const activity of trip.activities) {
            if (activity._id) {
                await db.updateActivity(activity);
            } else {
                const newActivityId = await db.createActivity(activity);
                activity._id = newActivityId;
            }
        }

        return { success: true };
    },

    delete: async ({ request }) => {
        const data = await request.formData();

        const tripId = data.get("id");

        // Lösche alle Aktivitäten, die mit dem Trip verknüpft sind
        const trip = await db.getTrip(tripId);
        if (trip && trip.activities) {
            for (const activityId of trip.activities) {
                await db.deleteActivity(activityId);
            }
        }

        // Lösche den Trip
        await db.deleteTrip(tripId);
        throw redirect(303, "/trips");
    },
};
