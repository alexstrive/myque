import React from 'react'

const Answer = ({ author, content }) => {
  return (
    <div>
      <b>{author}</b>
      <p>{content}</p>
    </div>
  )
}

export default Answer
