"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { FormData } from "./types";

export async function submitBarangayID(data: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay ID",
      name: `${data.firstName} ${data.middleName} ${data.lastName}`,
      birthdate: data.birthdate ? new Date(data.birthdate) : null,
      birthplace: data.birthplace,
      age: data.age,
      height: data.height,
      weight: data.weight,
      civil_status: data.civilStatus,
      address: data.address,
      contact_person_name: data.contactPersonName,
      contact_person_number: data.contactPersonNumber,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Barangay ID:", error);
    throw error;
  }
  revalidatePath("/user/tickets", "layout");
  redirect("/user/tickets");
}

export async function submitBarangayCert(data: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay Certificate",
      name: `${data.firstName} ${data.middleName} ${data.lastName}`,
      age: data.age,
      civil_status: data.civilStatus,
      address: data.address,
      purpose: data.purpose,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Barangay Certificate:", error);
    throw error;
  }
}

export async function submitBarangayClearance(data: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay Clearance",
      name: `${data.firstName} ${data.middleName} ${data.lastName}`,
      age: data.age,
      status: data.status,
      address: data.address,
      purpose: data.purpose,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Barangay Clearance:", error);
    throw error;
  }
}

export async function submitCedula(data: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Cedula",
      last_name: data.lastName,
      first_name: data.firstName,
      middle_name: data.middleName,
      birthdate: data.birthdate ? new Date(data.birthdate) : null,
      birthplace: data.birthplace,
      age: data.age,
      height: data.height,
      weight: data.weight,
      civil_status: data.civilStatus,
      address: data.address,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Cedula:", error);
    throw error;
  }
}

export async function submitBarangayIndigent(data: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay Indigent",
      last_name: data.lastName,
      first_name: data.firstName,
      middle_name: data.middleName,
      age: data.age,
      status: data.status,
      address: data.address,
      purpose: data.purpose,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Barangay Indigent:", error);
    throw error;
  }
}
