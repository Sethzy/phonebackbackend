const People = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => {
        console.log("Individual person:", person);
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}> Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default People;
