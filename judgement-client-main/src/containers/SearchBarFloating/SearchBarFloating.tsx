import { useMemo, useState } from 'react'
import 'animate.css'
import { NavLink } from 'react-router-dom'
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  debounce,
} from '@mui/material'
import clsx from 'clsx'
import { useLazySearchUsersQuery } from '@Stores/index'
import { Error } from '@Components/Error'
import type { UserType } from '@Models/UserModels'
import type { SearchUsersRequestDataType, UsernameType } from '@Models/UserModels/User'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { getName } from '@Utils/helpers'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import { ROUTES } from '@Constants/router.constants'
import { RESPONSE } from '@Constants/response.constants'
import useFetchError from '@Hooks/useFetchError'
import { SearchUserItemSkeleton } from '@Components/SearchUserItemSkeleton'
import Close from '@mui/icons-material/Close'
import { useStyles } from './style'

interface SearchListPropsType {
  searchQuery: string
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchList({ searchQuery, setShowSearchBar }: SearchListPropsType) {
  const { classes } = useStyles()

  const documentsLimit = RESPONSE.USER_SEARCH_LIMIT

  const requestArgs: SearchUsersRequestDataType = useMemo(() => ({ searchQuery }), [searchQuery])

  const { trackedRef, showDetector, state, results } = useLazyLoading(
    useLazySearchUsersQuery,
    requestArgs,
    1,
    documentsLimit,
  )

  const { pages, isFetching, isSuccess, loadErrorMsg, isLoadError } = state
  const { error } = results

  const users: UserType[] = []
  pages.forEach((curPage) => {
    users.push(...curPage.data.users)
  })

  const { errorMsg } = useFetchError('Users', error, isLoadError, users, isSuccess)

  return (
    <Box className={classes.listWrapper}>
      {isLoadError && <Error errorMsg={errorMsg || loadErrorMsg} />}
      {isSuccess && users.length === 0 ? (
        <Typography variant='h6' className={classes.defaultText}>
          No users found
        </Typography>
      ) : (
        <Grid container flexDirection='column' alignItems='center' className={classes.playerList}>
          {isSuccess &&
            users &&
            users.map((user) => (
              <Box className={classes.itemContainer}>
                <NavLink
                  onClick={() => setShowSearchBar(false)}
                  to={`${ROUTES.PROFILE}/${user.username}`}
                  className={classes.searchItemLink}
                >
                  <div />
                </NavLink>
                <Grid
                  container
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  key={`search-friend-${user._id}`}
                  className={classes.playerListItem}
                >
                  <Box className={classes.userInfo}>
                    <Grid item>
                      <Avatar src={user.displayImg?.smallUrl} className={classes.avatars} />
                    </Grid>
                    <Grid
                      container
                      direction='column'
                      justifyContent='center'
                      className={classes.userTextSection}
                    >
                      <Typography className={clsx(classes.infoText, classes.username)}>
                        {user.username}
                      </Typography>
                      <Typography className={clsx(classes.infoText, classes.name)}>
                        {getName(user)}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            ))}
          {isFetching &&
            [...Array(documentsLimit).keys()].map((key) => (
              <SearchUserItemSkeleton key={`friend-search-skeleton-${key}`} />
            ))}
          {showDetector && (
            <Box ref={trackedRef} sx={{ width: '100%' }}>
              <SearchUserItemSkeleton key='friend-search-skeleton-track' />
            </Box>
          )}
        </Grid>
      )}
    </Box>
  )
}

interface SearchBarPropsType {
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ setShowSearchBar }: SearchBarPropsType) {
  const { classes } = useStyles()

  const [searchQuery, setSearchQuery] = useState<UsernameType>('')

  const func = debounce((val) => setSearchQuery(val), 500)

  return (
    <Paper
      elevation={24}
      className={clsx('animate__animated', 'animate__fadeIn', classes.searchBarBox)}
    >
      <ClickAwayListener
        onClickAway={() => {
          setShowSearchBar(false)
        }}
      >
        <Box className={classes.searchArea}>
          <TextField
            variant='outlined'
            size='small'
            name='username'
            placeholder='username'
            onChange={(e) => func(e.target.value)}
            type='search'
            autoComplete='off'
            autoFocus
            inputProps={{ maxLength: INPUT_LENGTH.USERNAME.MAX }}
            className={classes.searchBox}
            spellCheck={false}
          />
          {searchQuery.length > 0 && (
            <SearchList searchQuery={searchQuery} setShowSearchBar={setShowSearchBar} />
          )}
          <Box className={classes.searchCloseBtnBox}>
            <IconButton className={classes.searchCloseBtn} onClick={() => setShowSearchBar(false)}>
              <Close fontSize='inherit' />
            </IconButton>
          </Box>
        </Box>
      </ClickAwayListener>
    </Paper>
  )
}

export function SearchBarFloating() {
  const { classes } = useStyles()
  const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <Box className={classes.searchBarBtnBox}>
      <IconButton onClick={() => setShowSearchBar(true)} className={classes.searchBarBtn}>
        <PersonSearchIcon className={classes.closeIcon} />
      </IconButton>
      {showSearchBar && <SearchBar setShowSearchBar={setShowSearchBar} />}
    </Box>
  )
}
