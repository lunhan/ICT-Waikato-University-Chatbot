  /**
   * Clear all slots in the session
   * @title Reset Slots
   * @category Custom
   * @author Ben Yu
   */
  const myAction = async () => {
    delete event.state.session.slots
  }

  return myAction()