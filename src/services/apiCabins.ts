import { CabinSchemaType } from "../features/cabins/CreateCabinForm";
import CabinData from "../interfaces/CabinData";
import supabase from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

async function createCabin(cabin: CabinSchemaType) {
  const newCabin = {
    name: cabin.name,
    max_capacity: cabin.maxCapacity,
    regular_price: cabin.regularPrice,
    discount: cabin.discount,
    description: cabin.description,
    image: cabin.image,
  };
  const { data, error } = await supabase
    .from("cabin")
    .insert([newCabin])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
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

export { getCabins, createCabin, deleteCabin };
