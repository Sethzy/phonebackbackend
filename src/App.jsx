import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Form from "./components/form";
import People from "./components/people";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = persons.find((p) => p.name === newName);

    if (person) {
      updatePerson(person);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(personObject)
      .then((response) => {
        console.log("added person response:", response);
        console.log("Response data:", response); // Debug the response
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log("add person error:", error);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(
        initialPersons.filter(
          (person) => person !== undefined && person !== null
        )
      );
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (person) => {
    const ok = window.confirm(`Delete ${person.name}?`);
    if (ok) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        console.log("deleted person:", person.id);
      });
    }
  };

  const updatePerson = (person) => {
    const ok = window.confirm(
      `${newName} is already added to phonebook, replace the number?`
    );
    if (ok) {
      personsService
        .update(person.id, { ...person, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson))
          );
          notifyWith(`Phone number of ${person.name} updated!`);
        })
        .catch(() => {
          notifyWith(`${person.name} has already been removed`, "error");
          setPersons(persons.filter((p) => p.id !== person.id));
        });

      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h1> add a new </h1>
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h1>Numbers</h1>
      <People persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};
export default App;
