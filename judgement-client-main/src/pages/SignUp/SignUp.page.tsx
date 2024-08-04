import { SignUpForm } from '@Containers/SignUpForm/SignUpForm.container'
import { AuthenticationForm } from '@Containers/AuthenticationForm/AuthenticationForm.container'

export function SignUp() {
  return <AuthenticationForm Element={SignUpForm} />
}
