import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/Button.jsx';
// import axios from '../utils/api.js'; // Commented out - uncomment when backend is ready

const schema = yup.object({
  email: yup.string().email().required(),
  mpesa_number: yup.string().matches(/^\+254\d{9}$/, 'Invalid M-Pesa number').required(),
  deriv_account_id: yup.string().required(),
});

const Profile = () => {
  const { token } = useAuth(); // Removed unused 'user'
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Commented out backend API call - uncomment when backend is ready
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get('/api/users/profile/');
  //       const data = response.data;
  //       setValue('email', data.email);
  //       setValue('mpesa_number', data.mpesa_number);
  //       setValue('deriv_account_id', data.deriv_account_id);
  //     } catch (error) {
  //       alert('Failed to load profile');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (token) fetchProfile();
  // }, [token, setValue]);

  // Temporary: Set dummy data for frontend testing
  useEffect(() => {
    if (token) {
      setValue('email', 'user@example.com');
      setValue('mpesa_number', '+254712345678');
      setValue('deriv_account_id', '123456789');
      setLoading(false);
    }
  }, [token, setValue]);

  // Commented out backend API call - uncomment when backend is ready
  // const onSubmit = async (data) => {
  //   try {
  //     await axios.put('/api/users/profile/', data);
  //     alert('Profile updated successfully');
  //   } catch (error) {
  //     alert('Update failed');
  //   }
  // };

  // Temporary: Mock update for frontend testing
  const onSubmit = (data) => {
    console.log('Profile update data:', data);
    alert('Profile updated successfully (mocked)');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl mb-4">Profile Management</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email')} className="block w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">M-Pesa Number</label>
          <input {...register('mpesa_number')} className="block w-full p-2 border rounded" />
          {errors.mpesa_number && <p className="text-red-500 text-sm">{errors.mpesa_number.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Deriv Account ID</label>
          <input {...register('deriv_account_id')} className="block w-full p-2 border rounded" />
          {errors.deriv_account_id && <p className="text-red-500 text-sm">{errors.deriv_account_id.message}</p>}
        </div>
        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </div>
  );
};

export default Profile;