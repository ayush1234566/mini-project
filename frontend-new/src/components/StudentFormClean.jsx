import React, { useState } from 'react'
import axios from 'axios'
import StyleTrendChart from './StyleTrendChart'

const initialForm = {
  StudyHours: 5,
  Attendance: 80,
  Resources: 3,
  Extracurricular: 1,
  Motivation: 6,
  Internet: 3,
  Gender: 'other',
  Age: 20,
  OnlineCourses: 1,
  Discussions: 3,
  AssignmentCompletion: 85,
  ExamScore: 70,
  EduTech: 3,
  StressLevel: 4,
  FinalGrade: 75,
}

export default function StudentFormClean(){
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleReset = () => { setFormData(initialForm); setResult(null); setError(null) }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null); setResult(null)
    try{
      // Map user-friendly inputs to backend expected ranges/types
      const mapGender = (g) => (g === 'female' ? 1 : 0) // assume male=0, female=1, other->0
      const mapBinary = (v) => (Number(v) > 0 ? 1 : 0)
      const mapMotivation = (v) => {
        // Map 0-10 -> 0-2
        const n = Number(v)
        return Math.min(2, Math.max(0, Math.round(n / 5)))
      }
      const mapInternet = (v) => (Number(v) > 0 ? 1 : 0) // None=0, any quality -> 1
      const mapEduTech = (v) => (Number(v) > 0 ? 1 : 0)
      const mapFinalGrade = (v) => {
        // Scale 0-100 to 0-10
        const n = Number(v)
        return Math.min(10, Math.max(0, Math.round(n / 10)))
      }

      const payload = {
        StudyHours: Number(formData.StudyHours),
        Attendance: Number(formData.Attendance),
        Resources: Number(formData.Resources),
        Extracurricular: mapBinary(formData.Extracurricular),
        Motivation: mapMotivation(formData.Motivation),
        Internet: mapInternet(formData.Internet),
        Gender: mapGender(formData.Gender),
        Age: Number(formData.Age),
        OnlineCourses: Number(formData.OnlineCourses),
        Discussions: Number(formData.Discussions),
        AssignmentCompletion: Number(formData.AssignmentCompletion),
        ExamScore: Number(formData.ExamScore),
        EduTech: mapEduTech(formData.EduTech),
        StressLevel: Number(formData.StressLevel),
        FinalGrade: mapFinalGrade(formData.FinalGrade),
      }

      const res = await axios.post('http://127.0.0.1:8000/predict-style', payload)
      setResult(res.data)
      setTimeout(()=>document.getElementById('result-section')?.scrollIntoView({behavior:'smooth'}),50)
    }catch(err){
      setError(err.response?.data || err.message)
    }finally{ setLoading(false) }
  }

  const learningName = (id) => ({0:'Visual',1:'Auditory',2:'Kinesthetic',3:'Reading/Writing'}[id]||`Style ${id}`)

  return (
    <div className="text-slate-50">
      <form onSubmit={handleSubmit} className="space-y-6">

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1 bg-slate-900/40 p-4 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-2">Personal</h3>
            <label className="block text-sm mb-2">
              <span className="text-slate-300">Gender</span>
              <div className="relative mt-1 select-wrapper">
                <select value={formData.Gender} onChange={(e)=>handleChange('Gender', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-50 appearance-none pr-8 select-custom">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <svg className="select-caret absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 9.6l3.3-3.3a1 1 0 111.4 1.4l-4 4A1 1 0 0110 12z" clipRule="evenodd"/></svg>
              </div>
            </label>
            <label className="block text-sm">
              <span className="text-slate-300">Age</span>
              <div className="relative mt-1 select-wrapper">
                <input type="number" min={10} max={100} value={formData.Age} onChange={(e)=>handleChange('Age', Number(e.target.value))} className="w-full bg-transparent border border-slate-700 rounded p-2" />
                <svg className="select-caret absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </label>
            <label className="block text-sm mt-3">
              <span className="text-slate-300">Internet quality</span>
              <div className="relative mt-1 select-wrapper">
                <select value={formData.Internet} onChange={(e)=>handleChange('Internet', Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-50 appearance-none pr-8 select-custom">
                  <option value={0}>None</option>
                  <option value={1}>Poor</option>
                  <option value={2}>Fair</option>
                  <option value={3}>Good</option>
                  <option value={4}>Excellent</option>
                </select>
                <svg className="select-caret absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 9.6l3.3-3.3a1 1 0 111.4 1.4l-4 4A1 1 0 0110 12z" clipRule="evenodd"/></svg>
              </div>
            </label>
          </div>

          <div className="col-span-1 md:col-span-2 bg-slate-900/40 p-4 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-2">Academic / Activities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-300">Study hours per day <span className="text-slate-400">{formData.StudyHours}h</span></label>
                <input type="range" min={0} max={20} value={formData.StudyHours} onChange={(e)=>handleChange('StudyHours', Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="text-sm text-slate-300">Attendance % <span className="text-slate-400">{formData.Attendance}%</span></label>
                <input type="range" min={0} max={100} value={formData.Attendance} onChange={(e)=>handleChange('Attendance', Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="text-sm text-slate-300">Assignment completion % <span className="text-slate-400">{formData.AssignmentCompletion}%</span></label>
                <input type="range" min={0} max={100} value={formData.AssignmentCompletion} onChange={(e)=>handleChange('AssignmentCompletion', Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="text-sm text-slate-300">Exam score <span className="text-slate-400">{formData.ExamScore}</span></label>
                <input type="range" min={0} max={100} value={formData.ExamScore} onChange={(e)=>handleChange('ExamScore', Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="text-sm text-slate-300">Motivation <span className="text-slate-400">{formData.Motivation}</span></label>
                <input type="range" min={0} max={10} value={formData.Motivation} onChange={(e)=>handleChange('Motivation', Number(e.target.value))} className="w-full mt-2" />
              </div>

              <div>
                <label className="text-sm text-slate-300">Stress level <span className="text-slate-400">{formData.StressLevel}</span></label>
                <input type="range" min={0} max={10} value={formData.StressLevel} onChange={(e)=>handleChange('StressLevel', Number(e.target.value))} className="w-full mt-2" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="text-sm">
                <span className="text-slate-300">Resources (0-5)</span>
                <input type="number" min={0} max={5} value={formData.Resources} onChange={(e)=>handleChange('Resources', Number(e.target.value))} className="mt-1 w-full bg-transparent border border-slate-700 rounded p-2" />
              </label>

              <label className="text-sm">
                <span className="text-slate-300">Extracurricular (hrs/week)</span>
                <input type="number" min={0} max={40} value={formData.Extracurricular} onChange={(e)=>handleChange('Extracurricular', Number(e.target.value))} className="mt-1 w-full bg-transparent border border-slate-700 rounded p-2" />
              </label>

              <label className="text-sm">
                <span className="text-slate-300">Discussions per week</span>
                <input type="number" min={0} max={20} value={formData.Discussions} onChange={(e)=>handleChange('Discussions', Number(e.target.value))} className="mt-1 w-full bg-transparent border border-slate-700 rounded p-2" />
              </label>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/40 p-4 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold mb-2">Tech & Outcomes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label className="text-sm">
              <span className="text-slate-300">Education Tech familiarity (0-5)</span>
              <div className="relative mt-1 select-wrapper">
                <input type="number" min={0} max={5} value={formData.EduTech} onChange={(e)=>handleChange('EduTech', Number(e.target.value))} className="w-full bg-transparent border border-slate-700 rounded p-2" />
                <svg className="select-caret absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200" width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 12l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </label>

            <label className="text-sm">
              <span className="text-slate-300">Online courses participation</span>
              <div className="relative mt-1 select-wrapper">
                <select value={formData.OnlineCourses} onChange={(e)=>handleChange('OnlineCourses', Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-slate-50 appearance-none pr-8 select-custom">
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
                <svg className="select-caret absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-200" width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 12a1 1 0 01-.7-.3l-4-4a1 1 0 111.4-1.4L10 9.6l3.3-3.3a1 1 0 111.4 1.4l-4 4A1 1 0 0110 12z" clipRule="evenodd"/></svg>
              </div>
            </label>

            <label className="text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Final grade (estimate)</span>
                <span className="text-slate-400 text-sm">{formData.FinalGrade}</span>
              </div>
              <input type="range" min={0} max={100} value={formData.FinalGrade} onChange={(e)=>handleChange('FinalGrade', Number(e.target.value))} className="w-full mt-2" />
            </label>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="btn-primary">{loading? 'Predicting...':'Predict'}</button>
          <button type="button" onClick={handleReset} className="btn-secondary">Reset</button>
          <div className="text-sm text-slate-400 ml-auto">Backend: <a className="underline" href="http://127.0.0.1:8000">127.0.0.1:8000</a></div>
        </div>

      </form>

      <div id="result-section" className="mt-6">
        {error && <pre className="text-red-400 bg-red-900/20 p-3 rounded">{JSON.stringify(error,null,2)}</pre>}
        {result && result.predictions && (
          <div>
            <div className="mt-4 p-6 rounded-lg bg-gradient-to-r from-purple-700/40 to-indigo-700/30 border border-purple-600">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Your Learning Style: {result.predicted_style}</h3>
                <p className="text-sm text-slate-200 mt-1">Based on your behavioral data, here's how you align with each learning style:</p>
              </div>

              <div className="space-y-4 mt-4">
                {result.predictions.map((pred, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${pred.is_predicted ? 'bg-white/10 border-2 border-yellow-400' : 'bg-slate-900/30'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-semibold ${pred.is_predicted ? 'text-yellow-300' : 'text-slate-200'}`}>
                          {pred.style}
                        </span>
                        {pred.is_predicted && (
                          <span className="text-xs bg-yellow-400 text-slate-900 px-2 py-1 rounded-full font-bold">
                            BEST MATCH
                          </span>
                        )}
                      </div>
                      <span className={`text-xl font-bold ${pred.is_predicted ? 'text-yellow-300' : 'text-slate-300'}`}>
                        {pred.percentage}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          pred.is_predicted 
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' 
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{ width: `${pred.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-slate-900/50 rounded text-sm text-slate-300">
                <strong>💡 What this means:</strong> The model analyzed your study habits, attendance, motivation, and other factors to determine which learning style suits you best. 
                The percentages show how strongly you align with each style.
              </div>
            </div>

            {/* Trend chart: use actual prediction probabilities */}
            <StyleTrendChart predictions={result.predictions} />
          </div>
        )}
      </div>
    </div>
  )
}
