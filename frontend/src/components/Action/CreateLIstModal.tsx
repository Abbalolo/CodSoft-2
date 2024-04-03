interface CreateListModalProps {
  lists: JSX.Element[];
}

function CreateListModal({ lists }: CreateListModalProps) {
  return (
    <>
      <div className="mt-5 flex gap-5 flex-col transition-all duration-300 ease-in-out">
        {lists.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
}

export default CreateListModal;
