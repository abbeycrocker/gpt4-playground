import { ChangeEvent, useState } from 'react'

import { Inter } from 'next/font/google'
import axios from 'axios'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleClick = async () => {
    try {
       // make call to openai api, using the input as the prompt
      
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
    <>
      <main className={styles.main}>
        {/* use tailwind inline styling to set the outer classname to align as columns equally spaced across the page. within the panels, center and align in rows */}
        <div className="flex flex-row space-between items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <textarea onChange={(e) => handleChange(e)} value={input} placeholder="Enter your text" />
            <button onClick={handleClick}>Go</button>
          </div>
          <div className="flex flex-col justify-center items-center m-96">
            {/* <h1 className="m-96">Your text:</h1> */}
            <p className={styles.wrap}>{result}</p>
          </div>
        </div>
        <div className="position-absolute bottom-0 flex flex-col">
          <p>Powered by OpenAI</p>
          <hr />
          {/* style anchor tag to look like a classic link */}
          <a href="/todo" className="text-blue-500 hover:text-blue-800">Click for Todo List</a>
        </div>
      </main>
    </>
  )
}
