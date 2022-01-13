  /**
   * Helper Action for the Course Information functionality
   * @title Course Information
   * @category Custom
   * @author Ben Yu and Reeve D'Cunha
   * @param {string} department - the department to search in
   */
  const axios = require('axios')
  const outlineURL = 'https://courseoutline.auckland.ac.nz/dco/course'
  const apiURL = 'https://course-recommender-rb.herokuapp.com'

  const myAction = async department => {
    let message // bot output

    // if course code was extracted from user message
    if (event.state.session.slots.CourseCode) {
      const code = event.state.session.slots.CourseCode.value
      message = `[Find out more about ${department} ${code}](${outlineURL}/${department}/${code})`
      const payloads = await bp.cms.renderElement('builtin_text', { markdown: true, text: message }, event)
      bp.events.replyToEvent(event, payloads)
      return
    }

    // course code not found, call API to get list of courses in department
    const processingPayload = await bp.cms.renderElement(
      'builtin_text',
      { text: 'Please wait while I process your request...' },
      event
    )
    bp.events.replyToEvent(event, processingPayload)

    // call API
    const response = await axios.get(`${apiURL}/courseCodes?dept=${department}`)
    message = `Here are the **${department}** courses available for the MInfoTech programme. Use the dropdown to select a course you'd like to learn more about.\n`

    // convert API response to botpress list options
    const options = []
    response.data.forEach(element => {
      options.push({
        label: element,
        value: element
      })
    })

    // output message and dropdown
    const payloads = await bp.cms.renderElement(
      'dropdown',
      {
        markdown: true,
        message: message,
        buttonText: 'Submit',
        options: options
      },
      event
    )
    bp.events.replyToEvent(event, payloads)
  }

  return myAction(args.department)