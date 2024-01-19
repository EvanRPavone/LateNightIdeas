const IdeaDetails = ({ idea }) => {
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
      <p>{idea.createdAt}</p>
    </div>
  )
};


export default IdeaDetails;
