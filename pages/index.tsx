import { ChangeEvent, useState } from 'react'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleClick = async () => {
    try {
      const { data, status } = await axios.post('/api/oai_chat', {
        params: {
          prompt: input
        }
      })
      if (status !== 200) {
       throw new Error('Error')
      }
      else {
        const response = data.data.choices[0].message.content
        setResult(response)
      }
      
    } catch (error) {
      alert('An error has occured')
    }
   
  }

  return (
      <div className="min-h-screen min-w-screen flex flex-row justify-center items-center ">
        <div className="flex flex-row space-between items-center justify-center">
          <div className="flex flex-col justify-center items-center w-64 h-32 border border-gray-300">
            <textarea onChange={(e) => handleChange(e)} value={input} placeholder="Enter your text" />
            <button onClick={handleClick}>Go</button>
          </div>
          <div className="flex flex-col justify-center items-center m-96">
            <p className="">{result}</p>
          </div>
        </div>
        <div className="position-absolute bottom-0 flex flex-col">
          <p>Powered by OpenAI</p>
          <hr />
          <Link href="/todo" className="text-blue-500 hover:text-blue-800">Todo List</Link>
        </div>
      </div>
  )
}
