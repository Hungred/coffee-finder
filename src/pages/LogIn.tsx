import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';

const LogIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await login({ username, password });
    if (token) {
      alert('登入成功！');
      navigate('/'); // 跳轉回首頁
    } else {
      alert('登入失敗');
    }
  };

  return (
    <div className='flex flex-col h-full items-center justify-center px-6 bg-coffee-bg-light'>
      <div className='w-full max-w-sm bg-white p-8 rounded-3xl shadow-soft'>
        <h2 className='text-2xl font-bold text-coffee-dark mb-6 text-center'>
          歡迎回來
        </h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <input
            placeholder='帳號'
            className='w-full p-4 bg-gray-50 rounded-xl outline-none'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='密碼'
            className='w-full p-4 bg-gray-50 rounded-xl outline-none'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='submit'
            className='w-full py-4 bg-coffee-primary text-white rounded-xl font-bold'
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
};
export default LogIn;
