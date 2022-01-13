  /**
   * Send a message as the chatbot
   * @title Send Message
   * @category Custom
   * @author Reeve D'Cunha
   * @param {string} message - Message to Display
   */
  const myAction = async message => {
    const payloads = await bp.cms.renderElement('builtin_text', { text: message, markdown: true, typing: true }, event)
    bp.events.replyToEvent(event, payloads)
  }

  return myAction(args.message)