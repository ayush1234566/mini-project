import React, { useState } from 'react'import React, { useState } from 'react'import React, { useState } from 'react'

import axios from 'axios'

import axios from 'axios'import axios from 'axios'

const initialForm = {

  StudyHours: '',

  Attendance: '',

  Resources: '',const initialForm = {const initialForm = {

  Extracurricular: '',

  Motivation: '',  StudyHours: '',  StudyHours: '',

  Internet: '',

  Gender: '',  Attendance: '',  Attendance: '',

  Age: '',

  OnlineCourses: '',  Resources: '',  Resources: '',

  Discussions: '',

  AssignmentCompletion: '',  Extracurricular: '',  Extracurricular: '',

  ExamScore: '',

  EduTech: '',  Motivation: '',  Motivation: '',

  StressLevel: '',

  FinalGrade: '',  Internet: '',  Internet: '',

}

  Gender: '',  Gender: '',

export default function StudentForm() {

  const [formData, setFormData] = useState(initialForm)  Age: '',  Age: '',

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)  OnlineCourses: '',  OnlineCourses: '',

  const [error, setError] = useState(null)

  Discussions: '',  Discussions: '',

  const handleChange = (e) => {

    const { name, value } = e.target  AssignmentCompletion: '',  AssignmentCompletion: '',

    setFormData((prev) => ({ ...prev, [name]: value }))

  }  ExamScore: '',  ExamScore: '',



  const handleReset = () => {  EduTech: '',  EduTech: '',

    setFormData(initialForm)

    setResult(null)  StressLevel: '',  StressLevel: '',

    setError(null)

  }  FinalGrade: '',  FinalGrade: '',



  const handleSubmit = async (e) => {}}

    e.preventDefault()

    setLoading(true)

    setError(null)

    setResult(null)export default function StudentForm() {export default function StudentForm() {



    try {  const [formData, setFormData] = useState(initialForm)  const [formData, setFormData] = useState(initialForm)

      const payload = {}

      for (const key in formData) {  const [loading, setLoading] = useState(false)  const [loading, setLoading] = useState(false)

        const v = formData[key]

        payload[key] = v === '' || v === null ? 0 : Number(v)  const [result, setResult] = useState(null)  const [result, setResult] = useState(null)

      }

  const [error, setError] = useState(null)  const [error, setError] = useState(null)

      const res = await axios.post('http://127.0.0.1:8000/predict-style', payload)

      setResult(res.data)

      setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 50)

    } catch (err) {  const handleChange = (e) => {  const handleChange = (e) => {

      setError(err.response?.data || err.message)

    } finally {    const { name, value } = e.target    const { name, value } = e.target

      setLoading(false)

    }    setFormData((prev) => ({ ...prev, [name]: value }))    import React, { useState } from 'react'

  }

  }    import axios from 'axios'

  const learningName = (id) => {

    const m = {

      0: 'Visual Learner',

      1: 'Auditory Learner',  const handleReset = () => {    const initialForm = {

      2: 'Kinesthetic Learner',

      3: 'Reading/Writing Learner',    setFormData(initialForm)      StudyHours: '',

    }

    return m[id] || `Style ${id}`    setResult(null)      Attendance: '',

  }

    setError(null)      Resources: '',

  return (

    <div>  }      Extracurricular: '',

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">      Motivation: '',

          {Object.keys(initialForm).map((key) => (

            <label key={key} className="flex flex-col text-sm">  const handleSubmit = async (e) => {      Internet: '',

              <span className="mb-1 text-slate-300">{key}</span>

              <input    e.preventDefault()      Gender: '',

                name={key}

                value={formData[key]}    setLoading(true)      Age: '',

                onChange={handleChange}

                className="border border-slate-700 bg-transparent px-3 py-2 rounded text-sm text-white"    setError(null)      OnlineCourses: '',

              />

            </label>    setResult(null)      Discussions: '',

          ))}

        </div>      AssignmentCompletion: '',



        <div className="flex gap-3">    try {      ExamScore: '',

          <button type="submit" disabled={loading} className="btn-primary">

            {loading ? 'Predicting...' : 'Predict'}      const payload = {}      EduTech: '',

          </button>

          <button type="button" onClick={handleReset} className="btn-secondary">      for (const key in formData) {      StressLevel: '',

            Reset

          </button>        const v = formData[key]      FinalGrade: '',

        </div>

      </form>        payload[key] = v === '' || v === null ? 0 : Number(v)    }



      <div id="result-section" className="mt-6">      }

        {error && <pre className="text-red-400">{JSON.stringify(error, null, 2)}</pre>}

        {result && (    export default function StudentForm() {

          <div className="resultCard">

            <h3 className="text-lg font-semibold">{learningName(result.learning_style_predicted)}</h3>      const res = await axios.post('http://127.0.0.1:8000/predict-style', payload)      const [formData, setFormData] = useState(initialForm)

            <p className="small">Prediction details below</p>

            <pre className="mt-3 text-xs">{JSON.stringify(result, null, 2)}</pre>      setResult(res.data)      const [loading, setLoading] = useState(false)

          </div>

        )}      setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 50)      const [result, setResult] = useState(null)

      </div>

    </div>    } catch (err) {      const [error, setError] = useState(null)

  )

}      setError(err.response?.data || err.message)


    } finally {      const handleChange = (e) => {

      setLoading(false)        const { name, value } = e.target

    }        setFormData((prev) => ({ ...prev, [name]: value }))

  }      }



  const getLearningStyleName = (styleId) => {      const handleReset = () => {

    const styles = {        setFormData(initialForm)

      0: 'Visual Learner',        setResult(null)

      import React, { useState } from 'react'
      import axios from 'axios'

      const initialForm = {
        StudyHours: '',
        Attendance: '',
        Resources: '',
        Extracurricular: '',
        Motivation: '',
        Internet: '',
        Gender: '',
        Age: '',
        OnlineCourses: '',
        Discussions: '',
        AssignmentCompletion: '',
        ExamScore: '',
        EduTech: '',
        StressLevel: '',
        FinalGrade: '',
      }

      export default function StudentForm() {
        const [formData, setFormData] = useState(initialForm)
        const [loading, setLoading] = useState(false)
        const [result, setResult] = useState(null)
        const [error, setError] = useState(null)

        const handleChange = (e) => {
          const { name, value } = e.target
          setFormData((prev) => ({ ...prev, [name]: value }))
        }

        const handleReset = () => {
          setFormData(initialForm)
          setResult(null)
          setError(null)
        }

        const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)
          setError(null)
          setResult(null)

          try {
            const payload = {}
            for (const key in formData) {
              const v = formData[key]
              payload[key] = v === '' || v === null ? 0 : Number(v)
            }

            const res = await axios.post('http://127.0.0.1:8000/predict-style', payload)
            setResult(res.data)
            setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 50)
          } catch (err) {
            setError(err.response?.data || err.message)
          } finally {
            setLoading(false)
          }
        }

        const learningName = (id) => {
          const m = {
            0: 'Visual Learner',
            1: 'Auditory Learner',
            2: 'Kinesthetic Learner',
            3: 'Reading/Writing Learner',
          }
          return m[id] || `Style ${id}`
        }

        return (
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(initialForm).map((key) => (
                  <label key={key} className="flex flex-col text-sm">
                    <span className="mb-1 text-slate-300">{key}</span>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="border border-slate-700 bg-transparent px-3 py-2 rounded text-sm text-white"
                    />
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Predicting...' : 'Predict'}
                </button>
                <button type="button" onClick={handleReset} className="btn-secondary">
                  Reset
                </button>
              </div>
            </form>

            <div id="result-section" className="mt-6">
              {error && <pre className="text-red-400">{JSON.stringify(error, null, 2)}</pre>}
              {result && (
                <div className="resultCard">
                  <h3 className="text-lg font-semibold">{learningName(result.learning_style_predicted)}</h3>
                  <p className="small">Prediction details below</p>
                  <pre className="mt-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )
      }

            <div className="flex items-start gap-3">                    name={key}

              <span className="text-4xl">🎯</span>                    value={formData[key]}

              <div className="flex-1">                    onChange={handleChange}

                <h3 className="text-2xl font-bold text-white mb-2">                    className="border border-gray-700 bg-transparent px-3 py-2 rounded text-sm text-white"

                  {getLearningStyleName(result.learning_style_predicted)}                  />

                </h3>                </label>

                <p className="text-gray-300 text-base">              ))}

                  {getLearningStyleDescription(result.learning_style_predicted)}            </div>

                </p>

              </div>            <div className="flex gap-3">

            </div>              <button type="submit" disabled={loading} className="btn-primary">

                            {loading ? 'Predicting...' : 'Predict'}

            {result.database_id && (              </button>

              <div className="text-sm text-gray-400 border-t border-white/10 pt-3">              <button type="button" onClick={handleReset} className="btn-secondary">

                💾 Saved to database: <code className="bg-white/5 px-2 py-1 rounded">{result.database_id}</code>                Reset

              </div>              </button>

            )}            </div>

                      </form>

            <details className="text-sm">

              <summary className="cursor-pointer text-gray-400 hover:text-gray-300">View full response</summary>          <div id="result-section" className="mt-6">

              <pre className="mt-2 p-3 bg-black/20 rounded overflow-auto text-xs">{JSON.stringify(result, null, 2)}</pre>            {error && <pre className="text-red-400">{JSON.stringify(error, null, 2)}</pre>}

            </details>            {result && (

          </div>              <div className="resultCard">

        )}                <h3 className="text-lg font-semibold">{getLearningStyleName(result.learning_style_predicted)}</h3>

      </div>                <p className="small">{getLearningStyleDescription(result.learning_style_predicted)}</p>

    </div>                <pre className="mt-3 text-xs">{JSON.stringify(result, null, 2)}</pre>

  )              </div>

}            )}

          </div>
        </div>
      )
    }

            <label key={key} className="flex flex-col text-sm" style={{marginBottom:8}}>                value={formData[key]}

              <span className="mb-1" style={{color:'#cbd5e1'}}>{key}</span>                onChange={handleChange}

              <input                className="border px-2 py-1 rounded"

                name={key}              />

                value={formData[key]}            </label>

                onChange={handleChange}          ))}

                className="border px-2 py-1 rounded"        </div>

              />

            </label>        <div className="flex gap-2 mt-4">

          ))}          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">

        </div>            {loading ? 'Predicting...' : 'Predict'}

          </button>

        <div style={{display:'flex',gap:8,marginTop:12}}>          <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-300 rounded">

          <button type="submit" disabled={loading} style={{padding:'8px 14px',background:'#7c3aed',color:'white',borderRadius:8,border:'none'}}>            Reset

            {loading ? 'Predicting...' : 'Predict'}          </button>

          </button>        </div>

          <button type="button" onClick={handleReset} style={{padding:'8px 14px',background:'#e2e8f0',color:'#0b1220',borderRadius:8,border:'none'}}>      </form>

            Reset

          </button>      <div id="result-section" className="mt-6">

        </div>        {error && (

      </form>          <pre className="text-red-600">{JSON.stringify(error, null, 2)}</pre>

        )}

      <div id="result-section" style={{marginTop:18}}>        {result && (

        {error && <pre style={{color:'#f87171'}}>{JSON.stringify(error, null, 2)}</pre>}          <div className="bg-green-50 border p-3 rounded">

        {result && (            <h3 className="font-semibold">Prediction</h3>

          <div className="resultCard">            <p>

            <h3 style={{marginTop:0}}>{getLearningStyleName(result.learning_style_predicted)}</h3>              Predicted learning style: <strong>{getLearningStyleName(result.learning_style_predicted)}</strong>

            <p className="small">{getLearningStyleDescription(result.learning_style_predicted)}</p>            </p>

            <div style={{marginTop:8}}>            <pre className="mt-2 text-sm">{JSON.stringify(result, null, 2)}</pre>

              <pre style={{fontSize:12}}>{JSON.stringify(result, null, 2)}</pre>          </div>

            </div>        )}

          </div>      </div>

        )}    </div>

      </div>  );

    </div>}

  )

}
