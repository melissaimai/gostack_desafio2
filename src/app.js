const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body

 const projectIndex = repositories.findIndex(repository => repository.id == id)
  if (projectIndex < 0) {
    return response.status(400).json({ message: " Repository not found!" })
  }
  repository = {
    id,
    title,
    url,
    techs,
    likes:0
  }
  repositories[projectIndex] = repository
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id)
  if (repositoryIndex < 0) {
    return response.status(400).json({ message: " Repository not found!" })
  }

  repositories.splice(repositoryIndex, 1)
  return response.status(204).json({ message: " Repository deleted" });
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params
  const repository = repositories.find(repo => repo.id == id)
  if (!repository) {
    return response.status(400).json({ message: 'Repository does not exist!' })
  }
  let likesCount = repository.likes
  repository.likes = likesCount + 1
  return response.json(repository)
})

module.exports = app;
