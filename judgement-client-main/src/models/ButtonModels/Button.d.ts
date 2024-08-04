import type { NavLinkProps } from 'react-router-dom'
import type { ButtonProps } from '@mui/material'

export interface ButtonPropsType extends ButtonProps {
  loading?: boolean
}

export interface NavButtonPropsType extends NavLinkProps {
  type?: 'home' | 'primary' | 'secondary'
}
