import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  handleDelete: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, handleDelete }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <li className="list-none my-5">
      <div
        className="my-1 p-2 color-neutral-300 border-1 border-neutral-300 rounded-md  mb-3 flex h-fit"
        onClick={() => setIsHidden(!isHidden)}
      >
        <div>
          <p className="text-xl text-neutral-500">{question}</p>
          {!isHidden ? <div className="py-2 text-left text-neutral-400">{answer}</div> : null}
        </div>

        {isHidden ? (
          <div className="ml-auto  self-center w-8">
            <div className="relative -top-2 -left-3  text-4xl text-neutral-500 mx-3">⌄</div>
          </div>
        ) : (
          <div className="ml-auto w-8"></div>
        )}

        <button
          className=" bg-neutral-400 text-white  self-center rounded-md h-fit w-fit px-3 py-2 hover:bg-neutral-500"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default FaqItem;
