import Link from "next/link";

export default function Todo() {
  return (
    <>
      <main className="">
        <h1>Todos:</h1>
        <ul>
            <li>
              <s>Chat mode. turn old box into uneditable, add new input below, feed all as prompt</s>
            </li>
            <li><s>GPT 3.5 vs GPT4 button</s></li>
            <li>Stream tokens in to help loading UX</li>
            <li>Temperature and max-token options</li>
            <li>Add system prompt option</li>
            <li>Price tag based on tokenizer</li>
            <li>auth?</li>
        </ul>
        <Link className="position absolute bottom-0" href='/'>Home</Link>
      </main>
    </>
  )
}