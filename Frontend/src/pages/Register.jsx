import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  mpesa_number: yup.string().matches(/^\+254\d{9}$/, 'Invalid M-Pesa number (e.g., +254712345678)').required(),
  deriv_account_id: yup.string().required(),
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/login'); // Or auto-login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <input {...register('username')} placeholder="Username" className="block w-full mb-2 p-2 border rounded" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        <input {...register('email')} placeholder="Email" className="block w-full mb-2 p-2 border rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <input {...register('password')} type="password" placeholder="Password" className="block w-full mb-2 p-2 border rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <input {...register('mpesa_number')} placeholder="M-Pesa Number (+254...)" className="block w-full mb-2 p-2 border rounded" />
        {errors.mpesa_number && <p className="text-red-500 text-sm">{errors.mpesa_number.message}</p>}
        <input {...register('deriv_account_id')} placeholder="Deriv Account ID" className="block w-full mb-2 p-2 border rounded" />
        {errors.deriv_account_id && <p className="text-red-500 text-sm">{errors.deriv_account_id.message}</p>}
        <Button type="submit" className="w-full mt-4">Register</Button>
      </form>
    </div>
  );
};

export default Register;