import { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useStyles } from './style'

export function SearchBar({
  placeholder = '',
  setSearchQuery,
  searchQuery,
}: {
  placeholder: string
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}) {
  const { classes } = useStyles()

  const [search, setSearch] = useState(searchQuery)

  function handleInput(value: string) {
    setSearch(value)
    if (value === '') {
      setSearchQuery(value)
    }
  }

  function updateSearch(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    setSearchQuery(search)
  }

  return (
    <form className={classes.searchBar}>
      <TextField
        id='standard-basic'
        variant='standard'
        placeholder={placeholder}
        fullWidth
        name='searchQuery'
        value={search}
        onChange={(event) => handleInput(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={(event) => updateSearch(event)} type='submit'>
                <SearchIcon className={classes.icon} />
              </IconButton>
            </InputAdornment>
          ),
          classes: {
            input: classes.textField,
          },
          disableUnderline: true,
        }}
      />
    </form>
  )
}
