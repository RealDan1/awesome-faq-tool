import FaqItem from './FaqItem';
import Header from './Header';
import ToolTip from './ToolTip';
import { useState } from 'react';
import type { FaqData } from '../types/types';
import { sortByAlphabet } from '../utils/sort';
import Swal from 'sweetalert2';

export default function Faq() {
  const [faqs, setFaqs] = useState<FaqData[]>([
    {
      id: '1',
      question: 'How do I add a question?',
      answer: 'Simply use the form above!',
    },
  ]);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  //tooltip hover behaviour
  const [isHoveredCreate, setIsHoveredCreate] = useState<boolean>(false);
  const [isHoveredCreated, setIsHoveredCreated] = useState<boolean>(false);

  const handleMouseEnterCreate = () => {
    setIsHoveredCreate(true);
  };

  const handleMouseLeaveCreate = () => {
    setIsHoveredCreate(false);
  };

  const handleMouseEnterCreated = () => {
    setIsHoveredCreated(true);
  };

  const handleMouseLeaveCreated = () => {
    setIsHoveredCreated(false);
  };

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
    if (!question || !answer) {
      // Easy alert library (SweetAlert) to save time, can refactor to custom alert given more time
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out both fields to add a question :)',
        timer: 4000,
      });

      return;
    }
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
    <div className="flex flex-col p-1 m-1 md:p-4 md:m-5 ">
      <Header />

      <div className="flex flex-col mr-5 md:flex md:flex-row">
        <div className="m-3 p-1 md:p-5 w-full ">
          <form className="flex flex-col w-full " onSubmit={handleAddFaq}>
            <div
              className="relative  w-fit"
              onMouseEnter={handleMouseEnterCreate}
              onMouseLeave={handleMouseLeaveCreate}
            >
              <h1 className="text-2xl md:text-3xl md:m-1">Create a new question</h1>
              {isHoveredCreate ? <ToolTip text="Fill out a question here!" /> : null}
            </div>
            <label htmlFor="question" className="m-1 text-left">
              Question
            </label>
            <textarea
              className="m-1 p-2 border-1 border-neutral-300 rounded-md h-20 mb-3 "
              id="question"
              placeholder="Write your guest's question here"
              maxLength={1000}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <label htmlFor="answer" className="m-1 text-left">
              Answer
            </label>
            <textarea
              id="answer"
              className="m-1 p-2 color-neutral-300 border-1 border-neutral-300 rounded-md h-20 mb-3"
              placeholder="Write your answer here"
              maxLength={1000}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <button
              className="bg-emerald-500 text-white rounded-md h-fit w-fit px-3 py-2 ml-1 hover:bg-emerald-600 min-w-47 self-center md:self-start "
              type="submit"
            >
              Create a question
            </button>
          </form>

          <div className=" m-1 my-1 flex">
            <label htmlFor="delay" className="py-3 self-center">
              Add 5 seconds delay to adding a question
            </label>
            <input
              id="delay"
              className="h-5 w-5 m-1.5 rounded-md self-center"
              type="checkbox"
              checked={isDelayed}
              onChange={() => setIsDelayed(!isDelayed)}
            />
          </div>

          <div
            className="relative  w-fit"
            onMouseEnter={handleMouseEnterCreated}
            onMouseLeave={handleMouseLeaveCreated}
          >
            <h1 className="text-2xl md:text-3xl md:m-1">Created questions</h1>
            {isHoveredCreated ? <ToolTip text="Edit and sort questions here!" /> : null}
          </div>

          {faqs.length > 0 ? (
            <ul className="list-none p-0 m-0">
              {faqs.map((item) => (
                <FaqItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  handleDelete={() => handleDelete(item.id)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-neutral-500 m-1 text-left">Looks like you haven't created any questions yet!</p>
          )}

          <div className="text-center md:text-left">
            {faqs.length > 0 ? (
              <>
                {faqs.length > 1 ? (
                  <button
                    onClick={handleSort}
                    className="m-1 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 min-w-47"
                  >
                    Sort questions
                  </button>
                ) : null}
                <button
                  onClick={handleClearAllFaqs}
                  className="m-1 bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 min-w-47"
                >
                  Remove all questions
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
