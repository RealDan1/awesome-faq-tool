import { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
  handleDelete: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, handleDelete }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <li>
      <div onClick={() => setIsHidden(!isHidden)}>
        <em>question: {question}</em>
      </div>
      {!isHidden ? <p>answer: {answer}</p> : null}
      <button className="outline-2 outline-blue-500/100" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default FaqItem;
