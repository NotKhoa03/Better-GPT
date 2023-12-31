import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, Loader, } from '../components'

const UploadFile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    promot: '',
    text: '',
  }); 

  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSubmit = () =>{

  }

  const handleChange = (e) =>{

  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Summarize PDF</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">Leverage the capabilities of GPT-3 to generate comprehensive summaries of PDF files</p>
      </div>
      
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Submit your file here"
            value={form.prompt}
            handleChange={handleChange}
          />
        </div>

      </form>
    </section>
  )
}

export default UploadFile