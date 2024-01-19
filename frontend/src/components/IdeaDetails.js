import { useIdeasContext } from "../hooks/useIdeasContext";
import { useAuthContext } from '../hooks/useAuthContext';

//date fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const IdeaDetails = ({ idea }) => {
  const { dispatch } = useIdeasContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('/api/ideas/' + idea._id, {
      method: 'DELETE', // TODO change to PATCH
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_IDEA', payload: json})
    }
  }
  
  return (
    <div className="idea-details">
      <h4>{idea.description}</h4>
      {idea.privacy === true ? (
        <p>Private</p>
      ) : (
        <p>Public</p>
      )}
      {idea.acknowledged === true ? (
        <p>Checkmark</p>
      ) : (
        <p>N/A</p>
      )}
      <p>{formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined"onClick={handleClick}>delete</span> {/* TODO change to acknowledged */}
    </div>
  )
};


export default IdeaDetails;
