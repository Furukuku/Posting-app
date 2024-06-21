import { useState } from "react";
import { router } from "@inertiajs/react";

const Post = ({ post, toast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [errors , setErrors] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleCancel = () => {
    setContent(post.content);
    setErrors(null);
    setIsEditing(false);
  }

  const handleShowDeleteModal = () => {
    setDeleteModal(true);
  }

  const handleDelete = () => {
    setIsLoading(true);
    router.delete(
      route('delete', {id: post.id}), 
      {
        onSuccess: () => {
          setDeleteModal(false);
          setIsLoading(false);
          toast.success('Successfully deleted!');
        }
      }
    );
  };

  const handleCloseModal = e => {
    e.stopPropagation();
    setDeleteModal(false);
  }

  const handleSubmit = () => {
    setIsLoading(true);
    router.put(
      route('update'), 
      {
        id: post.id, 
        content: content 
      },
      {
      onSuccess: () => {
        setIsEditing(false);
        setIsLoading(false);
        toast.success('Successfully updated!');
      },
      onError: errs => {
        setErrors(errs);
        setIsEditing(true);
        setIsLoading(false);
      }
    });
  }; 

  return (
    <article className="border p-5 rounded-lg shadow bg-white mb-5">
      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
        <div>
          {isEditing ? (
            <>
              <button 
                className="underline text-sm me-2 disabled:opacity-65"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Save
              </button>
              <button 
              className="underline text-sm ms-2 disabled:opacity-65"
              disabled={isLoading}
              onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                className="underline text-sm me-2"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button 
              className="underline text-sm me-2"
              onClick={handleShowDeleteModal}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? 
        <form>
          <textarea 
            className="w-full resize-none rounded-md h-60 border-gray-400"
            value={content}
            onChange={handleChange}
          ></textarea>
          {errors && <p className="text-xs text-red-600 px-1">{errors.content}</p>}
        </form>
      : 
        <p className="text-sm">{post.content}</p>
      }
      {deleteModal && (
        <div 
          className="bg-black bg-opacity-20 fixed inset-0 grid place-items-center"
          onClick={handleCloseModal}
        >
          <div 
            className="w-96 border shadow-md bg-white px-8 py-6 rounded-lg"
            onClick={e => e.stopPropagation()}
          >
            <p className="mb-3 text-xl font-semibold">Delete Post</p>
            <p className="mb-5">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-3">
              <button 
                className="border px-4 py-1.5 rounded-md shadow-sm hover:shadow disabled:opacity-65"
                disabled={isLoading}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="border px-4 py-1.5 rounded-md bg-red-600 text-white shadow-sm hover:shadow-lg disabled:opacity-65"
                disabled={isLoading}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default Post
