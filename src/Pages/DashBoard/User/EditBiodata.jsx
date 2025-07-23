
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Contex/AuthProvider';
import axiosInstance from '../../../Axios Instance/axios';
import Swal from 'sweetalert2';

const divisions = ['Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Satkhira', 'Mymensingh', 'Sylhet'];

const EditBiodata = () => {
  const { uploadImage, uploading, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  // ✅ Fetch existing biodata and set default values
  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await axiosInstance.get(`/biodata?email=${user?.email}`);
        if (res.data?.success) {
          const bio = res.data.data;
          setIsEditing(true);
          Object.keys(bio).forEach((key) => {
            if (key !== "_id" && key !== "email") {
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

  // ✅ Image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImage(file);
    if (url) setValue('profileImage', url);
  };

  // ✅ Submit handler
  const onSubmit = async (data) => {
    if (user?.email) data.email = user.email;

    try {
      let res;
      if (isEditing) {
        res = await axiosInstance.patch(`/update-biodata/${user.email}`, data);
      } else {
        res = await axiosInstance.post('/add-biodata', data);
      }

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: isEditing ? 'Biodata updated successfully.' : 'Biodata submitted successfully.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message
      });
    }
  };

  return (
    <div className="px-2 sm:px-4 py-10">
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-semibold subtitle-font mb-10">
          {isEditing ? 'Edit Your Biodata' : 'Create Your Biodata'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

          {/* Biodata Type */}
          <div>
            <label className="block mb-1">Biodata Type *</label>
            <div className="flex gap-4">
              <label>
                <input type="radio" value="Male" {...register("biodataType", { required: true })} />
                <span className="ml-1">Male</span>
              </label>
              <label>
                <input type="radio" value="Female" {...register("biodataType", { required: true })} />
                <span className="ml-1">Female</span>
              </label>
            </div>
            {errors.biodataType && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1">Name *</label>
            <input {...register("name", { required: true })} className="w-full p-2.5 border rounded" />
            {errors.name && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Image & Mobile */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Upload Profile Image *</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border rounded" />
              {uploading && <p className="text-blue-500 text-xs mt-1">Uploading...</p>}
              <input type="hidden" {...register("profileImage", { required: true })} />
              {errors.profileImage && <p className="text-red-500 text-xs">Image required</p>}
            </div>

            <div>
              <label className="block mb-1">Mobile Number *</label>
              <input {...register("mobile", { required: true })} className="w-full py-2.5 border rounded" />
              {errors.mobile && <p className="text-red-500 text-xs">Required</p>}
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1">Date of Birth *</label>
            <input type="date" {...register("dob", { required: true })} className="w-full border rounded p-1.5" />
            {errors.dob && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Height */}
          <div>
            <label className="block mb-1">Height *</label>
            <select {...register("height", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="5'0&quot;">5'0"</option>
              <option value="5'5&quot;">5'5"</option>
              <option value="6'0&quot;">6'0"</option>
            </select>
            {errors.height && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-1">Weight *</label>
            <select {...register("weight", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
            </select>
            {errors.weight && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1">Age *</label>
            <input type="number" {...register("age", { required: true })} className="w-full border rounded p-1.5" />
            {errors.age && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Occupation */}
          <div>
            <label className="block mb-1">Occupation *</label>
            <select {...register("occupation", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
            </select>
            {errors.occupation && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Race */}
          <div>
            <label className="block mb-1">Race (Skin Color) *</label>
            <select {...register("race", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="Fair">Fair</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
            </select>
            {errors.race && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Father's Name */}
          <div>
            <label className="block mb-1">Father's Name *</label>
            <input {...register("fatherName", { required: true })} className="w-full border rounded p-1.5" />
            {errors.fatherName && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Mother's Name */}
          <div>
            <label className="block mb-1">Mother's Name *</label>
            <input {...register("motherName", { required: true })} className="w-full border rounded p-1.5" />
            {errors.motherName && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Permanent Division */}
          <div>
            <label className="block mb-1">Permanent Division *</label>
            <select {...register("permanentDivision", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              {divisions.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
            {errors.permanentDivision && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Present Division */}
          <div>
            <label className="block mb-1">Present Division *</label>
            <select {...register("presentDivision", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              {divisions.map((div) => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
            {errors.presentDivision && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Expected Partner Age */}
          <div>
            <label className="block mb-1">Expected Partner Age *</label>
            <input type="number" {...register("expectedPartnerAge", { required: true })} className="w-full border rounded p-1.5" />
            {errors.expectedPartnerAge && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Expected Partner Height */}
          <div>
            <label className="block mb-1">Expected Partner Height *</label>
            <select {...register("expectedPartnerHeight", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="5'0&quot;">5'0"</option>
              <option value="5'5&quot;">5'5"</option>
              <option value="6'0&quot;">6'0"</option>
            </select>
            {errors.expectedPartnerHeight && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Expected Partner Weight */}
          <div>
            <label className="block mb-1">Expected Partner Weight *</label>
            <select {...register("expectedPartnerWeight", { required: true })} className="w-full border rounded p-1.5">
              <option value="">Select</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
            </select>
            {errors.expectedPartnerWeight && <p className="text-red-500 text-xs">Required</p>}
          </div>

          {/* Email Readonly */}
          <div>
            <label className="block mb-1">Contact Email</label>
            <input type="email" readOnly value={user?.email} className="w-full border rounded p-1.5 bg-gray-100" />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center mt-4">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded hover:bg-blue-700 transition">
              {isEditing ? 'Update Biodata' : 'Save And Publish Now'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditBiodata;
