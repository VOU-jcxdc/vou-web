"use server";

// import createSupabaseServerClient from "@supabase/server";
import { redirect } from "next/navigation";

export async function signOutHandler() {
  // const supabase = await createSupabaseServerClient();
  // const { error } = await supabase.auth.signOut();
  // if (error) {
  //   return error;
  // }
  return redirect("/log-in");
}
