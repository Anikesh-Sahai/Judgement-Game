import { Routes, Route, Navigate } from 'react-router-dom'
import { SignUp } from '@Pages/SignUp'
import { Login } from '@Pages/Login'
import { GuardedRoute } from '@Routers/Gaurded.router'
import { PARAMS, ROUTES } from '@Constants'
import { Home } from '@Pages/HomePage'
import { useAppSelector } from '@Hooks/redux.hooks'
import { AuthHome } from '@Pages/AuthHomePage'
import { ForgotPassword } from '@Pages/ForgotPassword'
import { ResetPassword } from '@Pages/ResetPassword'
import { Game } from '@Pages/Game'
import { Group } from '@Pages/Group'
import { Play } from '@Containers/Play'
import { ProfilePage } from '@Pages/Profile'
import { GamesInfo } from '@Containers/GamesInfo'
import { FriendsInfo } from '@Containers/FriendsInfo'
import { ProfileGroupsInfo } from '@Containers/ProfieGroupsInfo'
import { Groups } from '@Pages/Groups'
import { Players } from '@Pages/Players'
import { VerifyEmail } from '@Containers/VerifyEmail'
import { DeleteAccount } from '@Pages/DeleteAccount'
import { NotFound } from '@Pages/NotFound'

export function Routers() {
  const auth = useAppSelector((store) => store?.root?.auth)

  return (
    <Routes>
      <Route path={`${ROUTES.GAMES}/:${PARAMS.GAME_ID}`} element={<Game />} />
      <Route path={`${ROUTES.PROFILE}`}>
        <Route index element={<Navigate replace to={`${auth.user.username}`} />} />
        <Route path={`:${PARAMS.USERNAME}`} element={<ProfilePage auth={!!auth.token} />}>
          <Route index element={<Navigate replace to='games' />} />
          <Route path='games' element={<GamesInfo />} />
          <Route path='friends' element={<FriendsInfo />} />
          <Route path='groups' element={<ProfileGroupsInfo />} />
        </Route>
      </Route>
      <Route
        element={<GuardedRoute isRouteAccessible={!auth.token} redirectRoute={ROUTES.AUTH_HOME} />}
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<Navigate to={ROUTES.FORGOT_PASSWORD} />} />
        <Route path={`${ROUTES.RESET_PASSWORD}/:${PARAMS.TOKEN}`} element={<ResetPassword />} />
      </Route>
      <Route
        element={<GuardedRoute isRouteAccessible={!!auth.token} redirectRoute={ROUTES.HOME} />}
      >
        <Route path={ROUTES.AUTH_HOME} element={<AuthHome />} />
        <Route path={`${ROUTES.GROUPS}/:${PARAMS.SLUG}`} element={<Group />} />
        <Route path={ROUTES.PLAY} element={<Play />} />
        <Route path={ROUTES.GROUPS} element={<Groups />} />
        <Route path={ROUTES.PLAYERS} element={<Players />} />
        <Route path={`${ROUTES.UPDATE_EMAIL}/:${PARAMS.TOKEN}`} element={<VerifyEmail />} />
        <Route path={`${ROUTES.DELETE_ACCOUNT}/:${PARAMS.TOKEN}`} element={<DeleteAccount />} />
      </Route>
      <Route path='*' element={<NotFound auth={!!auth.token} />} />
    </Routes>
  )
}
