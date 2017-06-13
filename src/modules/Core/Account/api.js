// import { activateWalletSuccess, archiveWalletSuccess } from ''

export const createWalletRequest = (walletType, keys) => {
  return (dispatch, getState) => {
    // dispatch(activateWalletStart(walletId))
    const { account } = getState().core
    return createWallet(account, walletType, keys)
  }
}

export const activateWalletRequest = walletId => {
  return (dispatch, getState) => {
    // dispatch(activateWalletStart(walletId))
    const { account } = getState().core
    return activateWallet(account, walletId)
  }
}

export const archiveWalletRequest = walletId => {
  return (dispatch, getState) => {
    // dispatch(archiveWalletStart(walletId))
    const { account } = getState().core
    return archiveWallet(account, walletId)
  }
}

export const deleteWalletRequest = walletId => {
  return (dispatch, getState) => {
    // dispatch(archiveWalletStart(walletId))
    const { account } = getState().core
    return deleteWallet(account, walletId)
  }
}

export const enablePinLoginRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { account } = state.core

    account.pinLogin = true

    account.folder.file('settings').getText()
    .then(currentSettings => {
      const settings = JSON.parse(currentSettings)
      settings.pinLogin = true
      const newSettings = JSON.stringify(settings)

      return account.folder.file('settings').setText(newSettings)
    })
  }
}

export const disablePinLoginRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { account } = state.core

    account.pinLogin = false

    account.folder.file('settings').getText()
    .then(text => {
      const settings = JSON.parse(text)
      settings.pinLogin = false

      return account.folder.file('settings').setText(settings)
    })
  }
}

export const enableTouchIdRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { account } = state.core

    account.touchId = true

    account.folder.file('settings').getText()
    .then(currentSettings => {
      const settings = JSON.parse(currentSettings)
      settings.touchId = true
      const newSettings = JSON.stringify(settings)

      return account.folder.file('settings').setText(newSettings)
    })
  }
}

export const disableTouchIdLoginRequest = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { account } = state.core

    account.touchId = false

    account.folder.file('settings').getText()
    .then(text => {
      const settings = JSON.parse(text)
      settings.touchId = false

      return account.folder.file('settings').setText(settings)
    })
  }
}

//  Helper functions
const createWallet = (account, walletType, keys) => {
  return account.createWallet(walletType, keys)
}

const activateWallet = (account, walletId) => {
  console.log('activating wallet', walletId)
  return account.changeKeyStates({
    walletId: { archived: false }
  })
}

const archiveWallet = (account, walletId) => {
  console.log('archiving wallet', walletId)
  return account.changeKeyStates({
    walletId: { archived: true }
  })
}

const deleteWallet = (account, walletId) => {
  console.log('deleting wallet', walletId)
  return account.changeKeyStates({
    walletId: { deleted: true }
  })
}