"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import nodemailer from "nodemailer";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    console.log("Login failed:", error);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user-roles")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  if (roleError) {
    console.log("Error fetching role:", roleError);
    redirect("/auth/login");
  }

  revalidatePath("/", "layout");

  if (roleData.role_id === 3) {
    redirect("/admin/dashboard");
  } else if (roleData.role_id === 2) {
    redirect("/staff/dashboard");
  } else if (roleData.role_id === 1) {
    redirect("/user/dashboard");
  }
}

export async function signup(formData: FormData) {
  const supabase = supabaseAdminClient;

  const { data: signUpData, error } = await supabase.auth.admin.createUser({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    email_confirm: true,
  });

  if (error) {
    console.log("Error creating user:", error);
  }
  const { error: updateError } = await supabase
    .from("user-sign-up")
    .update({
      status: "Accepted",
    })
    .eq("email", signUpData.user?.email);

  const { error: insertError } = await supabase.from("user-roles").insert({
    user_id: signUpData.user?.id,
    role_id: 1,
  });
  if (insertError) {
    console.log(signUpData.user?.id);
    console.log("Error updating user status:", insertError);
  }

  const { error: insertError2 } = await supabase.from("user-info").insert({
    user_id: signUpData.user?.id,
    full_name: formData.get("full_name") as string,
    location: formData.get("location") as string,
    document_1: formData.get("document_1") as string,
    document_2: formData.get("document_2") as string,
  });
  if (insertError2) {
    console.log("Error updating user status:", insertError2);
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Manibaug Porac Ticket System",
    to: signUpData.user?.email, // Recipient
    subject: "Registration Approved",
    text: `Hello, your registration has been approved! You can now log in and start using our services.`,
    html: `<p>Hello,</p><p>Your registration has been approved! 🎉</p><p>You can now log in and start using our services.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${signUpData.user?.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function signupStaff(formData: FormData) {
  const supabase = supabaseAdminClient;

  const { data: signUpData, error } = await supabase.auth.admin.createUser({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    email_confirm: true,
  });

  if (error) {
    console.log("Error creating user:", error);
  }

  const { error: insertError } = await supabase.from("user-roles").insert({
    user_id: signUpData.user?.id,
    role_id: 2,
  });
  if (insertError) {
    console.log("Error updating user status:", insertError);
  }

  const full_name = `${formData.get("first_name")} ${formData.get(
    "last_name"
  )}`;

  const { error: insertError2 } = await supabase.from("user-info").insert({
    user_id: signUpData.user?.id,
    full_name: full_name as string,
    location: formData.get("location") as string,
  });
  if (insertError2) {
    console.log("Error updating user status:", insertError2);
  }
}

export async function declineUser(formData: FormData) {
  const supabase = supabaseAdminClient;
  const email = formData.get("email") as string;

  const { error: updateError } = await supabase
    .from("user-sign-up")
    .update({
      status: "Declined",
    })
    .eq("email", formData.get("email") as string);
  if (updateError) {
    console.log("Error updating user status:", updateError);
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Manibaug Porac Ticket System",
    to: email, // Recipient
    subject: "Registration Rejected",
    text: `Hello, your registration has been rejected. Please contact support for more information.`,
    html: `<p>Hello,</p><p>Your registration has been rejected. Please contact support for more information.</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function registerUser(formData: FormData) {
  const supabaseAdmin = supabaseAdminClient;
  const supabase = await createClient();
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    location: formData.get("location") as string,
    document1: formData.get("document1") as File,
    document2: formData.get("document2") as File,
  };

  // Retrieve the list of users
  const {
    data: { users },
    error: userError,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (userError) {
    console.log("Error retrieving users:", userError);
  }

  // Check if the email is already registered
  const emailExists = users.some((user) => user.email === data.email);
  if (emailExists) {
    throw new Error("Email is already registered");
  }

  // Upload document1
  const document1Upload = await supabase.storage
    .from("user_sign_up_attachments")
    .upload(`public/${data.email}/document1`, data.document1, { upsert: true });

  // Upload document2
  const document2Upload = await supabase.storage
    .from("user_sign_up_attachments")
    .upload(`public/${data.email}/document2`, data.document2, { upsert: true });

  // Handle upload errors
  if (document1Upload.error || document2Upload.error) {
    console.log(
      "Error uploading documents:",
      document1Upload.error || document2Upload.error
    );
  }

  // Get public URLs for the uploaded documents
  const document1Url = supabase.storage
    .from("user_sign_up_attachments")
    .getPublicUrl(`public/${data.email}/document1`);

  const document2Url = supabase.storage
    .from("user_sign_up_attachments")
    .getPublicUrl(`public/${data.email}/document2`);

  // Insert the new user's data
  const { error } = await supabase.from("user-sign-up").insert({
    full_name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    location: data.location,
    document_1: document1Url.data.publicUrl,
    document_2: document2Url.data.publicUrl,
    status: "Open",
  });
}
