import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contex/AuthProvider';
import axiosInstance from '../../../Axios Instance/axios';
import Swal from 'sweetalert2';

const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Satkhira', 'Mymensingh', 'Sylhet'];

const EditBiodata = () => {
  const { uploadImage, uploading, user , biodata } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing biodata & set default values
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await axiosInstance.get(`/biodata?email=${user?.email}`);
        if (res.data?.success) {
          const bio = res.data.data;
          setIsEditing(true);
          Object.keys(bio).forEach((key) => {
            if (key !== '_id' && key !== 'email') {
              setValue(key, bio[key]);
            }
          });
        }
      } catch {
        setIsEditing(false);
      }
    };

    if (user?.email) fetchBiodata();
  }, [user, setValue]);

  // Image upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImage(file);
    if (url) setValue('profileImage', url);
  };

  // Submit form data
 const onSubmit = async (data) => {
  if (user?.email) data.email = user.email;

  const updateName = { name: data.name };

  try {
    let res;
    if (isEditing) {
      // Update biodata
      res = await axiosInstance.patch(`/update-biodata/${user.email}`, data);
    
      if(biodata){
             // Update name in users collection
      await axiosInstance.patch(`/update-user-name/${user.email}`, updateName);

      // Update name in contactRequests collection
      await axiosInstance.patch(`/update-contact-request-name/${user.email}`, updateName);
      }
   
    } else {
      // Add new biodata
      res = await axiosInstance.post('/add-biodata', data);


      if(biodata){
             // Update name in users collection
      await axiosInstance.patch(`/update-user-name/${user.email}`, updateName);

      // Update name in contactRequests collection
      await axiosInstance.patch(`/update-contact-request-name/${user.email}`, updateName);
      }
    }

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: isEditing ? 'Biodata updated successfully.' : 'Biodata submitted successfully.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }
};



  return (
    <div className="px-4 sm:px-6 md:px-8 py-10 ">
      <h2 className="text-3xl font-semibold mb-12 text-center text-gray-800">
        {isEditing ? 'Edit Your Biodata' : 'Create Your Biodata'}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
        noValidate
      >
        {/* Biodata Type */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Biodata Type *</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Male"
                {...register('biodataType', { required: true })}
                className="accent-rose-500"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="Female"
                {...register('biodataType', { required: true })}
                className="accent-rose-500"
              />
              <span>Female</span>
            </label>
          </div>
          {errors.biodataType && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name *</label>
          <input
            {...register('name', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Image & Mobile */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Profile Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded border border-gray-300  cursor-pointer hover:border-rose-500 transition"
            />
            {uploading && <p className="text-blue-500 text-xs mt-1">Uploading...</p>}
            <input type="hidden" {...register('profileImage', { required: true })} />
            {errors.profileImage && (
              <p className="text-red-500 text-xs mt-1">Profile image is required.</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Mobile Number *</label>
            <input
              {...register('mobile', { required: true })}
              className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g. +8801XXXXXXXXX"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Date of Birth *</label>
          <input
            type="date"
            {...register('dob', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.dob ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Height */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Height *</label>
          <select
            {...register('height', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.height ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select height</option>
            <option value="5'0&quot;">5'0"</option>
            <option value="5'5&quot;">5'5"</option>
            <option value="6'0&quot;">6'0"</option>
          </select>
          {errors.height && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Weight (kg) *</label>
          <select
            {...register('weight', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.weight ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select weight</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
          </select>
          {errors.weight && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Age *</label>
          <input
            type="number"
            {...register('age', { required: true, min: 18 })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your age"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">Please enter a valid age.</p>}
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Occupation *</label>
          <select
            {...register('occupation', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.occupation ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select occupation</option>
            <option value="Student">Student</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
          </select>
          {errors.occupation && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Race */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Race (Skin Color) *</label>
          <select
            {...register('race', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.race ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select skin color</option>
            <option value="Fair">Fair</option>
            <option value="Medium">Medium</option>
            <option value="Dark">Dark</option>
          </select>
          {errors.race && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Father's Name *</label>
          <input
            {...register('fatherName', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.fatherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Father's full name"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Mother's Name *</label>
          <input
            {...register('motherName', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.motherName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Mother's full name"
          />
          {errors.motherName && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Permanent Division *</label>
          <select
            {...register('permanentDivision', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.permanentDivision ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.permanentDivision && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Present Division */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Present Division *</label>
          <select
            {...register('presentDivision', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.presentDivision ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.presentDivision && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Expected Partner Age *</label>
          <input
            type="number"
            {...register('expectedPartnerAge', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.expectedPartnerAge ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Expected age"
          />
          {errors.expectedPartnerAge && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Expected Partner Height *</label>
          <select
            {...register('expectedPartnerHeight', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.expectedPartnerHeight ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select height</option>
            <option value="5'0&quot;">5'0"</option>
            <option value="5'5&quot;">5'5"</option>
            <option value="6'0&quot;">6'0"</option>
          </select>
          {errors.expectedPartnerHeight && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Expected Partner Weight *</label>
          <select
            {...register('expectedPartnerWeight', { required: true })}
            className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              errors.expectedPartnerWeight ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select weight</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
          </select>
          {errors.expectedPartnerWeight && (
            <p className="text-red-500 text-xs mt-1">This field is required.</p>
          )}
        </div>

        {/* Contact Email - readonly */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ''}
            className="w-full p-3 rounded border bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isEditing ? 'Update Biodata' : 'Save And Publish Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
