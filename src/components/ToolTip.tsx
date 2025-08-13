interface ToolTipProps {
  text: string;
}

const ToolTip: React.FC<ToolTipProps> = ({ text }) => {
  return (
    <div>
      {/* arrow */}
      <div className="bg-black w-6 h-6 rotate-45 absolute -right-3 -bottom-6 -z-20"></div>
      {/* added higher z-index to avoid sitting behind dropdown arrow in edit section */}
      <div className="bg-black p-2 w-fit text-white rounded-lg absolute -bottom-11 md:-bottom-11 -right-10 md:-right-40 z-20">
        {text}
      </div>
    </div>
  );
};

export default ToolTip;
