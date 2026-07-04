import supabase, { supabaseUrl } from "./supabase";

export interface NewCabin {
  name?: string;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  description?: string;
  image: File | string;
  [key: string]: unknown;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin: NewCabin, id?: number | string) {
  const hasImagePath =
    typeof newCabin.image === "string" && newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${(newCabin.image as File).name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Handle insert and update separately to avoid type conflicts
  const { data, error } = id
    ? await supabase
        .from("cabins")
        .update({ ...newCabin, image: imagePath })
        .eq("id", id)
        .select()
        .single()
    : await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select()
        .single();

  if (error) {
    console.error(error);
    throw new Error("Could not create/edit the cabin.");
  }

  // Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image as File);

  // Delete the cabin if image was not uploaded successfully
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id: number | string) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete the row Item.");
  }

  return data;
}