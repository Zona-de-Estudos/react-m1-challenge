import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepository = {
        url: "https://github.com/johnvidal77",
        title: `Desafio ReactJS ${Date.now()}`,
        techs: ["React", "Node.js"],
      };

    try{
      const response = await api.post("/repositories", newRepository)

      setRepositories([...repositories, response.data])
    }catch(err){
      console.error(err)
    }
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`/repositories/${id}`)

      const newRepositories = repositories;
      const repositoryIndex = newRepositories.findIndex(repository => repository.id === id);

      newRepositories.splice(repositoryIndex, 1);

      setRepositories([...newRepositories])
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    api.get("/repositories")
      .then(response => setRepositories(response.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
