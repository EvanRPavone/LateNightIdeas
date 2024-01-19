import { useState } from "react"

const IdeaForm = () => {
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const idea = {description, privacy}

    const response = await fetch('/api/ideas', {
      method: 'POST',
      body: JSON.stringify(idea),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setDescription('')
      setPrivacy(true)
      setError(null)
      console.log("New Idea added", json)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Idea</h3>

      <label>The Idea:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="What ya thinking..."
      />
      <label>
        Private?
        <input 
          type="checkbox"
          onChange={(e) => setPrivacy(e.target.value)}
          value={privacy}
        />
      </label>

      <button>Add Idea</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default IdeaForm;
