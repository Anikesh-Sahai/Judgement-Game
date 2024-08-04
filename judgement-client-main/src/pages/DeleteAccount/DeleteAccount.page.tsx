import { AuthenticationForm } from '@Containers/AuthenticationForm'
import { ConfirmDeleteAccount } from '@Containers/ConfirmDeleteAccount'

export function DeleteAccount() {
  return <AuthenticationForm Element={ConfirmDeleteAccount} auth />
}
