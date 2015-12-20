import { AppDispatcher } from '../dispatcher/dispatcher'


export const SidebarAction = {

  toggle () {
    AppDispatcher.dispatch({
      eventName: 'toggle-sidebar'
    })
  }
}
