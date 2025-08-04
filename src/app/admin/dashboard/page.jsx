import { createClient } from '../../lib/supabase/server';
import { redirect } from 'next/navigation';
import SignOutButton from '../../components/SignOutButton'; // We will create this next

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Hello, {user.email}</h1>
      <p>This is your protected dashboard.</p>
      <SignOutButton />
    </div>
  );
}
