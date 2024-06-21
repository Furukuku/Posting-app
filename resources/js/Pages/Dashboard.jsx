import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Posts from "@/Components/Posts";
import { Head } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard({ auth, posts }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Posts posts={posts} toast={toast} />
    </AuthenticatedLayout>
  );
}
