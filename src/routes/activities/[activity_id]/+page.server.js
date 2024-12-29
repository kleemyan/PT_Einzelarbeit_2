import db from "$lib/db.js";

export async function load({ params }) {
  return{
    activity: await db.getActivity(params.activity_id)
  };
}
