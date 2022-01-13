  /**
   * Provides information about a topic for a Programme and automatically asks if Programme is not clear
   * @title Intent to Choice
   * @category Custom
   * @author Benjamin Yu and Reeve D'Cunha
   * @param {string} topic - Name of Topic e.g. Fees
   * @param {string} pgCertId - Id of PGCert information content
   * @param {string} mInfoTechId - Id of MInfoTech information content
   */
  const myAction = async (topic, pgCertId, mInfoTechId) => {
    let programmeValue = null

    // check whether programme name was mentioned in user message
    event.nlu.entities.forEach(entity => {
      if (entity.name === 'Programme') {
        programmeValue = entity.data.value
      }
    })

    if (programmeValue) {
      // programme was mentioned in user message
      if (programmeValue === 'Both' || programmeValue === 'PGCert') {
        // Display Topic Text for PGCert
        const payloadPGCert = await bp.cms.renderElement(pgCertId, [], event)
        bp.events.replyToEvent(event, payloadPGCert)
      }
      if (programmeValue === 'Both' || programmeValue === 'MInfoTech') {
        // Display Topic Text for MInfoTech
        const payloadMInfoTech = await bp.cms.renderElement(mInfoTechId, [], event)
        bp.events.replyToEvent(event, payloadMInfoTech)
      }
    } else {
      // programme was not retrieved from user message
      // display buttons for clarification
      const payloads = await bp.cms.renderElement(
        '#builtin_single-choice',
        {
          typing: true,
          text: 'What programme would you like to learn more about?',
          choices: [
            {
              title: `${topic} for MInfoTech`,
              value: `${topic} for MInfoTech`
            },
            {
              title: `${topic} for PGCert`,
              value: `${topic} for PGCert`
            },
            {
              title: `${topic} for Both`,
              value: `${topic} for Both`
            }
          ]
        },
        event
      )
      bp.events.replyToEvent(event, payloads)
    }
  }

  return myAction(args.topic, args.pgCertId, args.mInfoTechId)