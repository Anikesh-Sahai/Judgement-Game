import type { ButtonPropsType } from '@Models/ButtonModels'
import type { PlayerType } from '@Models/PlayerModels'

export type ActionButtonType = 'addFriend' | 'unfriend' | 'requested' | 'confirm' | 'reject'

export type ActionButtonConfigType = {
  [key in ActionButtonType]: {
    icon: string
    text: string
    alt: string
  }
}

export interface ButtonWithIconPropsType extends ButtonPropsType {
  iconClass?: string
}

export interface ActionButtonPropsType extends ButtonWithIconPropsType {
  btnType: ActionButtonType
}

export interface PlayerSocialButtonProps extends ButtonWithIconPropsType {
  user: PlayerType
  handleCacheMutation?: () => void
}

export interface PlayerSocialOperationButtonProps extends PlayerSocialButtonProps {
  group?: {
    _id?: string
    groupName?: string
  }
}
