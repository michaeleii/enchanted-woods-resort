import { CabinSchemaType } from "../features/cabins/CreateCabinForm";
import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function createEditCabin(cabin: CabinSchemaType, id?: number) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;
  //1. Create a cabin
  const newCabin = {
    name: cabin.name,
    max_capacity: cabin.maxCapacity,
    regular_price: cabin.regularPrice,
    discount: cabin.discount,
    description: cabin.description,
    image: imagePath,
  };

  const query = !id
    ? supabase.from("cabin").insert([newCabin]).select()
    : supabase.from("cabin").update(newCabin).eq("id", id).select();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin_images")
    .upload(imageName, cabin.image);
  // 3. Delete the cabin if there was an error uploading the image
  if (storageError && data) {
    await deleteCabin(data[0].id);
    throw new Error("Image could not be uploaded and cabin was not created");
  }

  return data;
}

async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabin").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export { getCabins, createEditCabin, deleteCabin };
