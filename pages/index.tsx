import { ChangeEvent, useState } from 'react'

import Link from 'next/link'
import axios from 'axios'

type Chat = {
  text: string,
  isUser: boolean,
  isFour: boolean
}

export default function Home() {
  const [input, setInput] = useState('')
  const [pass, setPass] = useState<string>('')
  const [chat, setChat] = useState<Chat[]>([])
  const [four, setFour] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false || process.env.NODE_ENV === "development")
  const getHash = async (password: string) => {
    setPass('')
    console.log(password)
    const { data, status } = await axios.post('/api/hash_pass', {
      params: {
        password
      }
    })
  
    if (status !== 200) {
      console.log(status)
      throw new Error('Error')
    }
    else {
      const result = data.result as boolean
      if (result) {
        alert('Successfully logged in')
      } else {
        alert('Incorrect password')
      }
      setLoggedIn(result)
    }
  }
  
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleClick = async () => {
    if (!loggedIn) {
      alert('Please enter the password to access the playground')
      return
    }
    setLoading(true)
    const newChat = {
      text: input,
      isUser: true,
      isFour: four
    }

    setChat([...chat, newChat])

    setInput('')


    try {
      const { data, status } = await axios.post('/api/oai_chat', {
        params: {
          prompt: input,
          history: chat
        }
      })
      if (status !== 200) {
       throw new Error('Error')
      }
      else {
        const response = data.data.choices[0].message.content
        const responseChat = {text: response, isUser: false, isFour: four}
        setChat([...chat, newChat, responseChat])
        setLoading(false)
      }
      
    } catch (error) {
      alert('An error has occured')
      setLoading(false)
    }
   
  }

  return (
      <>
        {/* {loggedIn ?  */}
          <div className="flex flex-row items-center justify-center min-h-screen">
            <div className="flex flex-col justify-start items-center position absolute top-3">
            <div className="flex flex-col items-center justify-center position absolute top-0 right-0 w-screen">
              <div className='flex flex-col items-start justify-start position absolute left-[7vw] top-3 md:relative'>
                <h1 className="text-2xs">Enter pass to unlock:</h1>
                <div className="flex flex-row">
                  <input type="password" onChange={(e) => setPass(e.target.value)} value={pass} className="border-1 border-gray-500 rounded-md p-1 bg-stone-200" />
                  <button onClick={() => getHash(pass)}>Go</button>
                </div>
              </div>
            </div>
              <h1 className='align-center font-medium text-center text-lg py-8 position max-lg:-right-40 max-lg:relative'>GPT-4 Playground</h1>
              <div className="h-[60vh] w-[90vw] md:h-[70vh] md:w-[50vw] xl:w-[25vw] relative border-[1px] border-gray-500 flex-col justify-between overflow-y-scroll">
                {chat.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row p-1">
                      <p className="text-gray-500 mr-1">{item.isUser ? 'You: ' : 'Bot: '}</p>
                      <p>{item.text}</p>
                    </div>
                  )
                })
                }
                {loading && <p className="items-center italic">Loading...</p>}
              </div>
              <div className="flex flex-row justify-between w-full px-4 py-1 mb-[5vh] md:mb-0">
                <textarea className="min-h-min outline-1" onChange={(e) => handleChange(e)} value={input} placeholder="Enter your text" />
                <button className='outline-1' onClick={handleClick}>Go</button>
              </div>
            </div>
            <div className="flex flex-row position absolute bottom-0 justify-between w-screen p-4">
              <form>
                <label>
                  <input type="radio" id="3.5" value="GPT3.5" checked={!four} onChange={() => setFour(false)}/>
                  GPT3.5
                </label>
                <label>
                  <input type="radio" id="4" value="GPT4" checked={four} onChange={() => setFour(true)}/>
                  GPT4
                </label>
              </form>
              <div>
                <button className="mx-2 bg-stone-100 hover:bg-stone-200" onClick={() => setChat([])}>Reset Chat</button>
                <Link href="/todo" className="">Todo List</Link>
              </div>
            </div>
          </div>
      </>
  )
}
