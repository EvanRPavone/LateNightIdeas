import { useState } from "react"
import { useIdeasContext } from "../hooks/useIdeasContext";
import { useAuthContext } from "../hooks/useAuthContext";

const IdeaForm = () => {
  const {dispatch} = useIdeasContext();
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState(true);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])
  const { user } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const idea = {description, privacy}

    const response = await fetch('/api/ideas', {
      method: 'POST',
      body: JSON.stringify(idea),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDescription('')
      setPrivacy(true)
      setError(null)
      setEmptyFields([])
      console.log("New Idea added", json)
      dispatch({type: "CREATE_IDEA", payload: json})
    }
  }
  // TODO FIX CHECKBOX -> still submitting to true, needs to submit to false if its not checked
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Idea</h3>

      <label>The Idea:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="What ya thinking..."
        className={emptyFields.includes('description') ? 'error' : ''}
      />
      <label>
        Private?
        <input 
          type="checkbox"
          onChange={(e) => setPrivacy(e.target.value)}
          value={privacy}
          defaultChecked={privacy}
        />
      </label>

      <button>Add Idea</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default IdeaForm;
