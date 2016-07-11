import React from 'react'
import { connect } from 'react-redux'
import { sendMessage } from 'actions/messageActionCreators'

import styles from 'modules/add-message'

// todo extract out ui

let AddMessage = ({ dispatch }) => {
  let input

  const onBlur = (e) => {
    e.preventDefault()
    if (input) {
      // input.focus()
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(sendMessage(input.value))
    input.value = ''
  }

  return (
    <div className={styles.addmessage}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input className={styles.input}
          ref={node => { input = node }}
          onBlur={onBlur}
        />
        <button className={styles.button} type="submit">
          Chat
        </button>
      </form>
    </div>
  )
}

AddMessage = connect()(AddMessage)

export default AddMessage
