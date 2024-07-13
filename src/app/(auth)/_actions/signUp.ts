"use server";

// import { createSupabaseAdmin } from "@supabase/server";

export async function signUpWithEmailAndPassword(data: {
  name: string;
  email: string;
  password: string;
  confirm: string;
}) {
  console.log(data);
  // const supabase = await createSupabaseAdmin();
  // const createResult = await supabase.auth.admin.createUser({
  //   email: data.email,
  //   password: data.password,
  //   email_confirm: true,
  // });
  // return JSON.stringify(createResult);
  return JSON.stringify("");
}
