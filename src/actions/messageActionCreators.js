const apiaiToken = '62323607e46c461995ff6430837c5a15'
const sessionId = (+new Date).toString(36)
let nextMessageId = 1

export const addMessageWithApiai = (text) => {
  return function(dispatch) {
    if (text === 'help') {
      dispatch(addMessage(text, true))
      dispatch(addMessage('Helping...', false)) // todo: get commands working
      fetch('http://ericliu121187.com/json').then(
        promise => promise.json().then(
          json => {
            console.log(json)
          }
        )
      )
    } else {
      const req = new Request('https://api.api.ai/v1/query?v=20150910', {
        body: JSON.stringify({
          lang: 'en',
          query: text,
          sessionId
        }),
        headers: new Headers({
          Authorization: `Bearer ${apiaiToken}`,
          'Content-Type': 'application/json; charset=utf-8'
        }),
        mode: 'cors',
        method: 'post'
      })

      dispatch(addMessage(text, true))
      fetch(req).then(
        promise => promise.json().then(
          body => {
            let apiaiText = body.result.fulfillment.speech || 'Sorry, I am too young to understand.'
            dispatch(addMessage(apiaiText, false))
          }
        ).catch(
          error => console.error(error) // todo: dispatch error!
        )
      )
    }
  }
}

export const addMessage = (text, fromUser) => {
  return {
    type: 'ADD_MESSAGE',
    id: nextMessageId++,
    text,
    fromUser
  }
}
