import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Input, Button, Typography } from '@material-tailwind/react';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ Email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/forgot-password', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen -mt-10">
      <Card className="w-full max-w-md">
        <CardHeader
          variant="gradient"
          color="amber"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Forgot Password
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                label="Email"
                size="lg"
                color='blue'
                required
              />
            </div>
            <Button
              type="submit"
              variant="gradient"
              color="amber"
              fullWidth
              className='text-white'
            >
              Reset Password
            </Button>
          </form>
          {message && <Typography variant="small" color="red" className="mt-4 text-center">{message}</Typography>}
          <Typography variant="small" className="mt-4 text-center">
            Remember Password?{' '}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;
