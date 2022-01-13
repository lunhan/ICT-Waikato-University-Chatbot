  /**
   * Convert recognised entities into botpress slots
   * @title Entity to Slot
   * @category Custom
   * @author Ben Yu and Reeve D'Cunha
   * @param {string} entityName - name of slot
   */
  const myAction = async entityName => {
    let entityValue

    // Looks for entity in most recent user message
    event.nlu.entities.forEach(entity => {
      if (entity.name === entityName) {
        entityValue = entity.data.value
      }
    })
    if (entityValue) {
      // Saves entity value to slot
      event.state.session.slots[entityName] = { value: entityValue }
    }
  }

  return myAction(args.entityName)