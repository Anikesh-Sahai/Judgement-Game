import { Dropdown } from '@Components/Dropdown'
import { useState } from 'react'
import arrowdown from '@Assets/icons/arrowdon.ico'
import type { SelectDropdownOption } from '@Models/SelectDropdownModels'
import { useStyles } from './style'

interface SelectDropdownPropsType<T> {
  selected: T
  setSelected: React.Dispatch<React.SetStateAction<T>>
  options: SelectDropdownOption<T>[]
  tooltipTitle?: string
}

export function SelectDropdown<T extends React.Key>({
  selected,
  setSelected,
  options,
  tooltipTitle = '',
}: SelectDropdownPropsType<T>) {
  const { classes } = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = (value: T) => {
    setSelected(value)
    setAnchorEl(null)
  }
  const currOption = options.find((option) => option.value === selected)

  return (
    <Dropdown className={classes.dropDown}>
      <Dropdown.MenuTip onClick={handleClick} className={classes.buttons} title={tooltipTitle}>
        <span> {currOption?.text} </span>
        <img src={arrowdown} alt='Dropdown logo' className={classes.downIcon} />
      </Dropdown.MenuTip>

      <Dropdown.MenuBar
        id='menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={classes.menuBar}
      >
        {options.map(
          (option) =>
            option.value !== selected && (
              <Dropdown.MenuBarItem
                onClick={() => handleChange(option.value)}
                className={classes.menuBarAccountItem}
                key={option.value}
              >
                <span className={classes.menuBarBtnText}>{option.text}</span>
              </Dropdown.MenuBarItem>
            ),
        )}
      </Dropdown.MenuBar>
    </Dropdown>
  )
}
