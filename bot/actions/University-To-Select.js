  /**
   * Small description of your action
   * @title University To Select
   * @category Custom
   * @author Your_Name
   */
  const myAction = async () => {
    let topic = event.nlu.intent.name
    if (!topic) {
      topic = event.payload.text
    }

    const payloads = await bp.cms.renderElement(
      '#builtin_single-choice',
      {
        typing: true,
        text: 'Which university would you like to learn more about?',
        choices: [
          {
            title: `${topic} for the University of Auckland`,
            value: `uoa`
          },
          {
            title: `${topic} for the University of Waikato`,
            value: `uow`
          }
        ]
      },
      event
    )
    bp.events.replyToEvent(event, payloads)
  }

  return myAction()