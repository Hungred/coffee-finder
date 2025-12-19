import './App.css';

function App() {
  return (
    <>
      <div className='min-h-screen bg-coffee-yellow p-6'>
        <div className='bg-white rounded-card shadow-soft p-4'>
          <h1 className='text-dark text-xl font-bold'>
            Coffee Finder 測試成功！
          </h1>
          <p className='text-coffee-green-light'>
            這是一個使用了 Tailwind v4 的測試卡片。
          </p>
          <button className='mt-4 bg-coffee-green px-4 py-2 rounded-full'>
            探索咖啡廳
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
