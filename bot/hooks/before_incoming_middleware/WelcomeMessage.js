  async function welcomeMessage() {
    if (event.type === 'visit') {
      if (!event.state.user.introMessage) {
        // skip welcome message if there were already messages
        const introMessage = await bp.cms.renderElement('!builtin_text-buoG6H', [], event)
        const quickButtons = await bp.cms.renderElement('!builtin_single-choice-7kAfWx', [], event)

        bp.events.replyToEvent(event, introMessage)
        bp.events.replyToEvent(event, quickButtons)
        event.state.user.introMessage = true
      }
    }
  }

  return welcomeMessage()