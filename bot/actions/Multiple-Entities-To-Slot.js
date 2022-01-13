  /**
   * Extract multiple entities from a user message and save it to a slot
   * @title Multiple Entities to Slot
   * @category Custom
   * @author Ben Yu and Reeve D'Cunha
   * @param {string} entityName - name of slot
   */

  const myAction = async entityName => {
    let entityValue
    const tempArray = []
    // Looks for entity in most recent user message
    event.nlu.entities.forEach(async entity => {
      if (entity.name === entityName) {
        entityValue = entity.data.value
        tempArray.push(entityValue)
      }
    })

    if (entityValue) {
      // Saves entity value to slot
      event.state.session.slots[entityName] = { value: tempArray.join(',') }
    }
  }

  return myAction(args.entityName)