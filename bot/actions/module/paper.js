  const PaperURLPrefix = 'https://www.waikato.ac.nz/study/papers/'
  /**
   * Show a link to paper detials
   * @title Open a webpage of paper detail
   * @category Custom
   * @author Joe
   * @param {string} paper - papercode
   */
  const myAction = async paper => {
    let link = PaperURLPrefix + paper.trim()
    let message = `Learn more about: [${paper}](${link}) paper`

    const payloads = await bp.cms.renderElement('builtin_text', { text: message, markdown: true, typing: true }, event)
    bp.events.replyToEvent(event, payloads)
  }

  return myAction(args.paper)