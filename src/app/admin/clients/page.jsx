import { createClient } from '../../lib/supabase/server';
import Link from 'next/link';

export default async function ClientsPage() {
  const supabase = createClient();
  const { data: clients, error } = await supabase.from('clients').select('*');

  if (error) {
    return <p>Error fetching clients: {error.message}</p>;
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>My Clients</h1>
        <Link href="/admin/clients/new">Add New Client</Link>
      </div>

      {clients.length > 0 ? (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.client_name}</strong> - {client.contact_name} (
              {client.contact_email})
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't added any clients yet.</p>
      )}
    </div>
  );
}
