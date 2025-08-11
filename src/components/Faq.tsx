import FaqItem from './FaqItem';
import Header from './Header';
import { useState } from 'react';
import type { FaqData } from '../types/types';
import { sortByAlphabet } from '../utils/sort';

export default function FaqList() {
  const [faqs, setFaqs] = useState<FaqData[]>([
    {
      id: '1',
      question: 'How do I add a question?',
      answer: 'Simply use the form above',
    },
  ]);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;
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
    <div>
      <Header />

      <form onSubmit={handleAddFaq}>
        <label htmlFor="question">Question:</label>
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />

        <label htmlFor="answer">Answer:</label>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />

        <button type="submit">Add</button>
      </form>

      {faqs.map((item) => (
        <FaqItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          handleDelete={() => handleDelete(item.id)}
        />
      ))}

      <button onClick={handleClearAllFaqs}>Clear all faqs</button>
      <button onClick={handleSort}>Sort</button>
    </div>
  );
}
