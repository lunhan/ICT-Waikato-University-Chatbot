  /**
   * Helper action to display error messages
   * @title Error Message
   * @category Custom
   * @author Ben Yu
   */
  const myAction = async () => {
    let message = "I'm sorry. I didn't quite understand what you meant. Please try rephrasing your question!"
    if (event.nlu.intents.length === 0) {
      message = 'Zzz... Oh sorry I was asleep! Could you please repeat that?'
    }

    const payloads = await bp.cms.renderElement('builtin_text', { markdown: true, text: message }, event)
    bp.events.replyToEvent(event, payloads)
  }

  return myAction()