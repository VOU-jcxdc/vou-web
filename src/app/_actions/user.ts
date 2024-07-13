"use server";

import createSupabaseServerClient from "@supabase/server";

export async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.getSession();
  return result;
}
