import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Welcome({ auth, posts }) {
  const formatDate = isoDateString => {
    const date = new Date(isoDateString);
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    const dateString = date.toLocaleDateString('en-US', dateOptions);
    const timeString = date.toLocaleTimeString('en-US', timeOptions);

    return `${dateString} - ${timeString}`; 
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Home" />
      <div className="w-[700px] mx-auto p-5">
        {posts.map(post => (
          <article key={post.id} className="border p-5 rounded-lg shadow bg-white mb-5">
            <p className="font-semibold mb-1">{post.user.name} <span className="float-right text-xs font-normal text-gray-800">{formatDate(post.created_at)}</span></p>
            <p className="text-sm">{post.content}</p>
          </article>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
