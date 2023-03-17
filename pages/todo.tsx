// create a page that lists all the todos

// Path: pages/todo.tsx

import styles from '@/styles/Home.module.css'

export default function Todo() {
  return (
    <>
      <main className={styles.main}>
        <h1>Todos:</h1>
        <ul>
            <li>Chat mode. turn old box into uneditable, add new input below, feed all as prompt</li>
            <li>Stream tokens in to help loading UX</li>
            <li>Temperature and max-token options</li>
            <li>Add system prompt option</li>
            <li>Price tag based on tokenizer</li>
            <li>Some sort of basic auth so AJ can not get charged </li>
        </ul>
      </main>
    </>
  )
}