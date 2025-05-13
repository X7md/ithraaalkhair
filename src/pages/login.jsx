import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  console.log("Login component rendered");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Example validation (replace with your actual logic)
    if ((username === 'admin') && (password === 'password')) {
      // Redirect to the test page
      localStorage.setItem('authToken', 'your_token_here'); // Store token in localStorage
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center gap-3 mb-8">
          <img src="/logo.svg" alt="Logo" className="h-12" />
          <h1 className="text-xl font-bold text-secondary">إدارة الجودة</h1>
          <div className="text-sm text-gray-500">
            {new Intl.DateTimeFormat('ar-SA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            }).format(new Date())}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              اسم المستخدم:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              الرقم السري:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            تسجيل الدخول
          </button>
        </form>
        <div className="text-center mt-8">
          <span dir="ltr" className="text-sm text-gray-500">Powered by: </span>
          <a href="https://mushkhbat.com">
            <img src="/mushkhbat.svg" className="max-h-[30px] w-full invert" />
          </a>
        </div>
      </div>
      <img className="fixed left-0 top-0 opacity-20 object-cover h-full w-full -z-10" src="/pattern.svg" />
    </div>
  );
};

export { Login };
Login.tab = "login";