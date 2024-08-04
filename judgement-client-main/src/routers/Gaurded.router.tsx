import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import type { GuardedRoutePropsType } from '@Models/RouterModels'

export function GuardedRoute({
  isRouteAccessible = false,
  redirectRoute = '/',
}: GuardedRoutePropsType) {
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next')
  return isRouteAccessible ? <Outlet /> : <Navigate to={next || redirectRoute} replace />
}
