'use client'

// import { uploadImage } from '@/app/api/tickets/actions';
import React from 'react'

export default function Try() {
  return (
    <div>
      
    <form
    onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput.files && fileInput.files[0]) {
            // await uploadImage(fileInput.files[0]);
        }
    }}
    >
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Upload Image</button>
    </form>
    </div>
  )
}
