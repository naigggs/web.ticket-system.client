"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function submitBarangayID(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const data = {
    firstName: formData.get("firstName") as string,
    middleName: formData.get("middleName") as string,
    lastName: formData.get("lastName") as string,
    birthdate: formData.get("birthdate") as string,
    birthplace: formData.get("birthplace") as string,
    age: parseInt(formData.get("age") as string),
    height: formData.get("height") as string,
    weight: formData.get("weight") as string,
    civilStatus: formData.get("civilStatus") as string,
    address: formData.get("address") as string,
    contactPersonName: formData.get("contactPersonName") as string,
    contactPersonNumber: formData.get("contactPersonNumber") as string,
  };

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

export async function submitBarangayCert(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const data = {
    firstName: formData.get("firstName") as string,
    middleName: formData.get("middleName") as string,
    lastName: formData.get("lastName") as string,
    age: parseInt(formData.get("age") as string),
    civilStatus: formData.get("civilStatus") as string,
    address: formData.get("address") as string,
    purpose: formData.get("purpose") as string,
  };

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

export async function submitBarangayClearance(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const data = {
    firstName: formData.get("firstName") as string,
    middleName: formData.get("middleName") as string,
    lastName: formData.get("lastName") as string,
    age: parseInt(formData.get("age") as string),
    status: formData.get("status") as string,
    address: formData.get("address") as string,
    purpose: formData.get("purpose") as string,
  };

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

export async function submitCedula(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const data = {
    firstName: formData.get("firstName") as string,
    middleName: formData.get("middleName") as string,
    lastName: formData.get("lastName") as string,
    birthdate: formData.get("birthdate") as string,
    birthplace: formData.get("birthplace") as string,
    age: parseInt(formData.get("age") as string),
    height: formData.get("height") as string,
    weight: formData.get("weight") as string,
    civilStatus: formData.get("civilStatus") as string,
    address: formData.get("address") as string,
  };

  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Cedula",
      name: `${data.firstName} ${data.middleName} ${data.lastName}`,
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

export async function submitBarangayIndigent(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const data = {
    firstName: formData.get("firstName") as string,
    middleName: formData.get("middleName") as string,
    lastName: formData.get("lastName") as string,
    age: parseInt(formData.get("age") as string),
    status: formData.get("status") as string,
    address: formData.get("address") as string,
    purpose: formData.get("purpose") as string,
  };

  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay Indigent",
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
    console.error("Error submitting Barangay Indigent:", error);
    throw error;
  }
}

export async function submitBarangayProblem(formData: FormData) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");

  const uploadFile = async (file: File | null) => {
    if (!file) return null;

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `attachments/tickets/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("ticket_attachments")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from("ticket_attachments")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const attachment1 = formData.get("attachment1") as File | null;
  const attachment2 = formData.get("attachment2") as File | null;

  const attachment1Url = attachment1 ? await uploadFile(attachment1) : null;
  const attachment2Url = attachment2 ? await uploadFile(attachment2) : null;

  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    attachment1: attachment1Url,
    attachment2: attachment2Url,
  };

  const { error } = await supabase.from("tickets").insert([
    {
      concern_type: "Barangay Problem",
      title: data.title,
      description: data.description,
      location: data.location,
      attachment_1: data.attachment1,
      attachment_2: data.attachment2,
      user_id: userId,
      ticket_status: "Open",
    },
  ]);

  if (error) {
    console.error("Error submitting Barangay Problem:", error);
    throw error;
  }
}

export async function assignTicket(ticketId: number) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  
  const { error } = await supabase
    .from("tickets")
    .update({ assignee_id: userId })
    .eq("id", ticketId);

  if (error) {
    console.error("Error assigning ticket:", error);
    throw error;
  }
}

