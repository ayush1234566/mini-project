import React from 'react'
import StudentForm from './components/StudentFormClean'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto py-12 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Learning Style Predictor</h1>
          <p className="text-sm text-slate-300">AI-powered learning style predictions • React + FastAPI</p>
        </header>

        <main>
          <div className="bg-slate-900/60 p-6 rounded-lg shadow-lg">
            <StudentForm />
          </div>
        </main>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          Backend: <a className="underline" href="http://127.0.0.1:8000">http://127.0.0.1:8000</a>
        </footer>
      </div>
    </div>
  )
}
