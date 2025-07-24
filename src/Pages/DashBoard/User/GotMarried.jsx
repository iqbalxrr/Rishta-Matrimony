import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contex/AuthProvider';
import axiosInstance from '../../../Axios Instance/axios';

const GotMarried = () => {
  const { uploadImage, biodata } = useContext(AuthContext);
  const [uploadingImg, setUploadingImg] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (storyData) => {
      const res = await axiosInstance.post('/success-story', storyData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Your story has been submitted.', 'success');
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to submit the story.', 'error');
    },
  });

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      return Swal.fire('Error', 'Please select an image.', 'error');
    }

    setUploadingImg(true);

    try {
      const imageUrl = await uploadImage(data.image[0]);

      const story = {
        selfId: parseInt(biodata?.bioId),
        partnerId: parseInt(data.partnerId),
        title: data.title,
        coupleImage: imageUrl,
        marriageDate: data.marriageDate,
        rating: parseInt(data.rating),
        story: data.story,
        createdAt: new Date().toISOString(),
      };

      mutation.mutate(story);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Submission failed.', 'error');
    } finally {
      setUploadingImg(false);
    }
  };

  return (
    <div className="px-4 md:px-6 py-10 ">
      <h2 className="text-2xl font-bold text-center subtitle-font mb-8">
        Submit Your Success Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 space-y-6 rounded shadow">
        {/* Self ID */}
        <div>
          <label className="block font-medium mb-1">Your Biodata ID</label>
          <input
            type="text"
            value={biodata?.bioId || ''}
            readOnly
            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Partner ID */}
        <div>
          <label className="block font-medium mb-1">Partner Biodata ID</label>
          <input
            type="number"
            {...register('partnerId', { required: 'Partner ID is required' })}
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400"
          />
          {errors.partnerId && (
            <p className="text-red-500 text-sm mt-1">{errors.partnerId.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder="e.g., Online Bond"
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Marriage Date */}
        <div>
          <label className="block font-medium mb-1">Marriage Date</label>
          <input
            type="date"
            {...register('marriageDate', { required: 'Marriage date is required' })}
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400"
          />
          {errors.marriageDate && (
            <p className="text-red-500 text-sm mt-1">{errors.marriageDate.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium mb-1">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            {...register('rating', { required: 'Rating is required' })}
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400"
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Couple Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: 'Image is required' })}
            className="w-full border px-4 rounded-md bg-white file:mr-4 file:py-3 file:px-3 file:border file:rounded file:bg-rose-500 file:text-white cursor-pointer"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Story */}
        <div>
          <label className="block font-medium mb-1">Success Story</label>
          <textarea
            {...register('story', { required: 'Your story is required' })}
            rows="5"
            placeholder="Share how you found love on our platform..."
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400 resize-none"
          ></textarea>
          {errors.story && <p className="text-red-500 text-sm mt-1">{errors.story.message}</p>}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={uploadingImg || mutation.isLoading}
            className={`${
              uploadingImg || mutation.isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 cursor-pointer'
            } text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition`}
          >
            {uploadingImg || mutation.isLoading ? 'Uploading...' : 'Submit Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarried;
