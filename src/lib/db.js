import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("TripPlaner"); // Name der Datenbank

//////////////////////////////////////////
// Trips
//////////////////////////////////////////

// Get all trips
async function getTrips() {
  let trips = [];
  try {
    const collection = db.collection("Trips");

    const query = {};

    trips = await collection.find(query).toArray();
    trips.forEach((trip) => {
      trip._id = trip._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return trips;
}

// Get trip by id
async function getTrip(id) {
  let trip = null;
  try {
    const collection = db.collection("Trips");
    const query = { _id: new ObjectId(id) };
    trip = await collection.findOne(query);

    if (!trip) {
      console.log("No trip with id " + id);
    } else {
      trip._id = trip._id.toString();

      // Verknüpfte Aktivitäten abrufen
      if (trip.activities && trip.activities.length > 0) {
        const activityCollection = db.collection("Activities");
        const activityIds = trip.activities.map((id) => new ObjectId(id));
        const activities = await activityCollection.find({ _id: { $in: activityIds } }).toArray();
        trip.activityDetails = activities.map((activity) => ({
          _id: activity._id.toString(),
          name: activity.name,
          location: activity.location,
        }));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return trip;
}

// Create a new trip
async function createTrip(trip) {
  // Validierung der erforderlichen Felder
  const requiredFields = ["title", "destination", "start_date", "end_date"];
  for (const field of requiredFields) {
    if (!trip[field]) {
      throw new Error(`Das Feld "${field}" ist erforderlich und fehlt.`);
    }
  }

  trip.activities = trip.activities || []; // Default: leere Aktivitätenliste

  try {
    const collection = db.collection("Trips");
    const result = await collection.insertOne(trip);
    return result.insertedId.toString(); // ObjectId als String zurückgeben
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Update a trip
async function updateTrip(trip) {
  try {
    let id = trip._id;
    delete trip._id; // _id entfernen, da es nicht aktualisiert werden kann
    const collection = db.collection("Trips");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: trip });

    if (result.matchedCount === 0) {
      console.log("No trip with id " + id);
    } else {
      console.log("Trip with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// Delete a trip by id
async function deleteTrip(id) {
  try {
    const collection = db.collection("Trips");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No trip with id " + id);
    } else {
      console.log("Trip with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

//////////////////////////////////////////
// Activities
//////////////////////////////////////////

// Get all activities
async function getActivities() {
  let activities = [];
  try {
    const collection = db.collection("Activities");

    // Alle Aktivitäten abrufen
    activities = await collection.find({}).toArray();

    // Verknüpfte Trips abrufen
    const tripCollection = db.collection("Trips");
    for (let activity of activities) {
      activity._id = activity._id.toString();

      if (activity.trips && activity.trips.length > 0) {
        const tripIds = activity.trips.map((id) => new ObjectId(id));
        const trips = await tripCollection.find({ _id: { $in: tripIds } }).toArray();
        activity.tripDetails = trips.map((trip) => ({
          _id: trip._id.toString(),
          title: trip.title,
          destination: trip.destination,
        }));
      }
    }
  } catch (error) {
    console.log(error);
  }
  return activities;
}

// Get activity by id
async function getActivity(id) {
  let activity = null;
  try {
    const collection = db.collection("Activities");
    const query = { _id: new ObjectId(id) };

    activity = await collection.findOne(query);

    if (!activity) {
      console.log("No activity with id " + id);
    } else {
      activity._id = activity._id.toString();

      // Verknüpfte Trips abrufen
      if (activity.trips && activity.trips.length > 0) {
        const tripCollection = db.collection("Trips");
        const tripIds = activity.trips.map((id) => new ObjectId(id));
        const trips = await tripCollection.find({ _id: { $in: tripIds } }).toArray();
        activity.tripDetails = trips.map((trip) => ({
          _id: trip._id.toString(),
          title: trip.title,
          destination: trip.destination,
        }));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  return activity;
}

// Create a new activity
async function createActivity(activity) {
  if (!activity.tripId) {
      throw new Error('Ein Trip-ID ist erforderlich, um eine Aktivität zu erstellen.');
  }

  // Überprüfen, ob der Trip existiert
  const tripCollection = db.collection("Trips");
  const trip = await tripCollection.findOne({ _id: new ObjectId(activity.tripId) }); // Ändere tripId zu activity.tripId

  if (!trip) {
    throw new Error(`Kein Trip mit der ID ${activity.tripId} gefunden.`);
  }

  activity.trips = [activity.tripId]; // Verknüpfe die Aktivität mit dem Trip
  try {
    const activityCollection = db.collection("Activities");

    // Aktivität erstellen
    const result = await activityCollection.insertOne(activity);
    const activityId = result.insertedId.toString();

    // Aktivität dem Trip hinzufügen
    await tripCollection.updateOne(
      { _id: new ObjectId(activity.tripId) }, // Ändere tripId zu activity.tripId
      { $push: { activities: activityId } }
    );

    return activityId;
  } catch (error) {
    console.log(error.message);
  }
  return null;
}


// Update an activity
async function updateActivity(activity) {
  try {
    let id = activity._id;
    delete activity._id;
    const collection = db.collection("Activities");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: activity });

    if (result.matchedCount === 0) {
      console.log("No activity with id " + id);
    }

    return id;
  } catch (error) {
    console.log(error.message);
  }

  return null;
}

// Delete an activity by id
async function deleteActivity(id) {
  try {
    const collection = db.collection("Activities");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No activity with id " + id);
    } else {
      console.log("Activity with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

export default {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};

