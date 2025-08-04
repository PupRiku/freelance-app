'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client.js';

export default function NewClientPage() {
  const router = useRouter();
  const supabase = createClient();

  const [clientName, setClientName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('clients').insert({
      client_name: clientName,
      contact_name: contactName,
      contact_email: contactEmail,
      // user_id is set automatically by the database default
    });

    if (error) {
      alert('Error adding client: ' + error.message);
      setIsSubmitting(false);
    } else {
      // Redirect to a page showing all clients (we'll create this later)
      alert('Client added successfully!');
      router.push('/admin/clients');
    }
  };

  return (
    <div>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientName">Client Name</label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactName">Contact Name</label>
          <input
            id="contactName"
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Client...' : 'Add Client'}
        </button>
      </form>
    </div>
  );
}
