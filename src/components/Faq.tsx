import FaqItem from './FaqItem';
import Header from './Header';
import { useState } from 'react';
import type { FaqData } from '../types/types';
import { sortByAlphabet } from '../utils/sort';

export default function Faq() {
  const [faqs, setFaqs] = useState<FaqData[]>([
    {
      id: '1',
      question: 'How do I add a question?',
      answer: 'Simply use the form above',
    },
  ]);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  //utility function for adding a faq and resetting the faqs form:
  function addFaq() {
    setFaqs([
      ...faqs,
      {
        id: crypto.randomUUID(),
        question: question,
        answer: answer,
      },
    ]);
    setQuestion('');
    setAnswer('');
  }

  //all handler functions:
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
    if (isDelayed) {
      setTimeout(() => {
        addFaq();
      }, 5000);
    } else {
      addFaq();
    }
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((item) => item.id != id));
  };

  const handleClearAllFaqs = () => {
    setFaqs([]);
  };

  const handleSort = () => {
    setFaqs((prev) => {
      return sortByAlphabet(prev);
    });
  };

  return (
    <div className="flex flex-col p-1 m-2 md:p-4 md:m-5  ">
      <Header />

      <div className="flex flex-col">
        <div className="border-1 border-black text-left self-center flex-col w-full max-w-7/10 ">
          <form className=" flex flex-col justify-self-start" onSubmit={handleAddFaq}>
            <h1 className="text-2xl md:text-3xl">Create a new Question</h1>
            <label htmlFor="question">Question:</label>
            <input id="question" type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />

            <label htmlFor="answer">Answer:</label>
            <input id="answer" type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />

            <button className="bg-emerald-400 w p-[0.5rem 1rem]" type="submit">
              Create a question
            </button>
          </form>
          <label htmlFor="delay">Add 5 second delay</label>
          <input id="delay" type="checkbox" checked={isDelayed} onChange={() => setIsDelayed(!isDelayed)} />

          {faqs.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              handleDelete={() => handleDelete(item.id)}
            />
          ))}

          {faqs.length > 0 ? (
            <>
              <button onClick={handleClearAllFaqs}>Clear all faqs</button>
              {faqs.length > 1 ? <button onClick={handleSort}>Sort</button> : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
