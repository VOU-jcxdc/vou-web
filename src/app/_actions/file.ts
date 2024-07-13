"use server";

// import createSupabaseServerClient from "@/supabase/server";

export async function downloadFiles(bucket: string, files: string[]) {
  // try {
  //   const supabase = await createSupabaseServerClient();
  //   const result = await supabase.storage.from(bucket).download(files[0]);
  //   return {
  //     status: 200,
  //     statusText: "OK",
  //     data: result.data,
  //     error: result.error,
  //   };
  // } catch (error: any) {
  //   return {
  //     status: 500,
  //     statusText: "Lỗi máy chủ",
  //     data: null,
  //     error: error.message,
  //   };
  // }
}
