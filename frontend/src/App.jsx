// import './App.css'

function App() {

  const testResult = import.meta.env.VITE_ENV_TEST;
  console.log(testResult);

  return (
    <h1 className="text-2xl bg-blue-400 text-white">Hello New Tailwind CSS.</h1>
  )
}

export default App
