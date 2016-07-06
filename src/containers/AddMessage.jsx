import React from 'react'
import { connect } from 'react-redux'
import { addMessageWithApiai } from 'actions/messageActionCreators'

import styles from 'styles/add-message'

let AddMessage = ({ dispatch }) => {
  let input

  const onBlur = (e) => {
    e.preventDefault()
    input.focus()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(addMessageWithApiai(input.value))
    input.value = ''
  }

  return (
    <div className={styles.addMessage}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input} ref={node => {
          input = node
          input.focus()
        }} onBlur={onBlur}/>
        <button className={styles.button} type="submit">
          Chat
        </button>
      </form>
    </div>
  )
}

AddMessage = connect()(AddMessage)

export default AddMessage
