import { router } from "@inertiajs/react";
import { useRef, useState } from "react";

const AddPost = ({ toast }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const content = useRef('');
  const [errors, setErrors] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors(null);
    content.current = '';
  };

  const handleChange = e => {
    content.current = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    router.post(
      route('add'), 
      {
        content: content.current
      },
      {
        onSuccess: () => {
          toast.success('Successfully posted!');
          setShowModal(false);
          setIsLoading(false);
          content.current = '';
        },
        onError: errs => {
          setErrors(errs);
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className="flex justify-end mb-4">
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
      /> */}
      <button 
        className="border px-3 py-1.5 text-sm rounded-md bg-black text-white"
        onClick={() => setShowModal(true)}
      >
        Add Post
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 grid place-items-center">
          <form 
            className="bg-white py-4 px-6 w-[500px] rounded-md"
            onSubmit={handleSubmit}
          >
            <p className="mb-2 text-lg font-semibold">Add new post</p>
            <div className="mb-2">
              <textarea 
                className="resize-none rounded-md border-gray-300 w-full h-40"
                onChange={handleChange}
              ></textarea>
              {errors && <p className="text-red-600 text-xs px-1">{errors.content}</p>}
            </div>
            <div className="flex justify-end gap-5">
              <button 
                className="border px-5 py-1.5 text-sm rounded-md shadow-sm hover:shadow disabled:opacity-65"
                disabled={isLoading}
                type="submit"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button 
                className="border px-7 py-1.5 text-sm rounded-md bg-black text-white hover:shadow-md disabled:opacity-65"
                disabled={isLoading}
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
};

export default AddPost;