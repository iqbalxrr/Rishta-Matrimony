import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contex/AuthProvider';


const GotMarried = () => {
  const { user, uploadImage, SuccessTost, ErrorTost } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadingImg, setUploadingImg] = useState(false);

  const onSubmit = async (data) => {
    if (!data.image[0]) {
      return ErrorTost('Please select an image.');
    }

    setUploadingImg(true);

    try {
      const imageUrl = await uploadImage(data.image[0]);

      if (!imageUrl) {
        return;
      }

      const story = {
        selfId: user?.uid || 'Unknown UID',
        partnerId: data.partnerId,
        imageUrl,
        review: data.review,
        createdAt: new Date().toISOString(),
      };

      console.log('Success Story to submit:', story);

      // ✅ Submit to backend (replace with actual DB call later)
      // await addDoc(collection(db, 'successStories'), story);

      SuccessTost('Your success story has been submitted!');
      reset();
    } catch (error) {
      console.error(error);
      ErrorTost('Submission failed');
    } finally {
      setUploadingImg(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Submit Your Success Story</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Self Biodata ID (readonly from context) */}
        <div>
          <label className="block font-medium mb-1">Your Biodata ID</label>
          <input
            type="text"
            value={user?.uid || ''}
            readOnly
            className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label className="block font-medium mb-1">Partner Biodata ID</label>
          <input
            type="text"
            {...register('partnerId', { required: 'Partner ID is required' })}
            placeholder="e.g., BID456"
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400"
          />
          {errors.partnerId && (
            <p className="text-red-500 text-sm mt-1">{errors.partnerId.message}</p>
          )}
        </div>

        {/* Couple Image Upload */}
        <div>
          <label className="block font-medium mb-1">Couple Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: 'Image is required' })}
            className="w-full border px-4 py-2 rounded-md bg-white file:mr-4 file:py-1 file:px-3 file:border file:rounded file:bg-rose-500 file:text-white"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Review */}
        <div>
          <label className="block font-medium mb-1">Success Story / Review</label>
          <textarea
            {...register('review', { required: 'Review is required' })}
            rows="5"
            placeholder="Share your love journey and how this platform helped you."
            className="w-full border px-4 py-2 rounded-md outline-none focus:ring-2 ring-rose-400 resize-none"
          ></textarea>
          {errors.review && (
            <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={uploadingImg}
            className={`${
              uploadingImg ? 'bg-gray-400' : 'bg-gradient-to-r from-rose-500 to-pink-500'
            } text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition`}
          >
            {uploadingImg ? 'Uploading...' : 'Submit Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarried;
