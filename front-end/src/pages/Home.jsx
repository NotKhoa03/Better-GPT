import React, {useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPOsts, setAllPosts] = useState(null);
  
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Empower Your Learning Journey with Cutting-Edge AI Tools</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">Browse through what other community members are learning. Summarized and generated using OpenAI's revolutionary GPT-3 model.</p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </section> 
  )
}

export default Home