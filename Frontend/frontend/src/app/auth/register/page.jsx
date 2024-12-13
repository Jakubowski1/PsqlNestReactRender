'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        credentials: 'include', // Include cookies in the request
      });

      const data = await res.json();

      if (res.ok) {
        // Registration successful, redirect to dashboard or login
        router.push('/dashboard');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Surname:
          <input
            name="surname"
            type="text"
            value={form.surname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
