export interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
  handleDelete: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ id, question, answer, handleDelete }) => {
  return (
    <li>
      id: {id} <br />
      <em>question: {question}</em>
      <p>answer: {answer}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default FaqItem;
