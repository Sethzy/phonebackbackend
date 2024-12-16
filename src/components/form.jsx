const Form = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={handleNameChange}
          type="text"
          placeholder="name"
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={handleNumberChange}
          type="text"
          placeholder="number"
        />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
