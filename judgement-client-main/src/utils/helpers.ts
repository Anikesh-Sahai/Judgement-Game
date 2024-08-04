/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CardsOnTableDataType } from '@Models/GameModels/Game'
import type { UserType } from '@Models/UserModels'
import goldMedal from '@Assets/images/gold_medal.png'
import silverMedal from '@Assets/images/silver_medal.png'
import bronzeMedal from '@Assets/images/bronze_medal.png'
import { type RefetchKeyType, refetchActions } from '@Stores/slices/refetchSlice'
import type { MutationLifecycleApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query'
import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

export function isDevEnv(): boolean {
  return import.meta.env.MODE === 'development'
}

export function getName(user: UserType): string {
  return `${user.firstName} ${user.lastName}`
}

export function paginatedUrl(url: string, page: number, limit: number) {
  return `${url}?page=${page}&limit=${limit}`
}

export function logDevError(err: unknown) {
  // log error if in dev environment
  if (isDevEnv()) {
    console.log(err)
  }
}

export const setErrorMsgAndLogErrorGenerator =
  (setError: (value: React.SetStateAction<string>) => void) => (err: unknown, msg: string) => {
    setError(msg)
    logDevError(err)
  }

export const getSuit = (card: number) => Math.floor(card / 13)

const checkIfValidCard = (
  card: number,
  suit: number,
  suitCardsOnTable: number[],
  suitCardsRemaining: number[],
  trumpCardsOnTable: number[],
  trumpCardsRemaining: number[],
  trump = 0,
) => {
  // in case player doesn't have any card of the suit
  if (!suitCardsRemaining.length) {
    // no trump card or even if there is trump card, it is lower in value than highest trump card on table.
    // so any card is valid
    if (
      !trumpCardsRemaining.length ||
      (trumpCardsOnTable.length &&
        trumpCardsRemaining[trumpCardsRemaining.length - 1] <
          trumpCardsOnTable[trumpCardsOnTable.length - 1])
    )
      return true

    // if player has the trump card then it should beat the trump card(if played) on the table
    return (
      getSuit(card) === trump &&
      (!trumpCardsOnTable.length || card > trumpCardsOnTable[trumpCardsOnTable.length - 1])
    )
  }

  const highestSuitCardOnTable = suitCardsOnTable[suitCardsOnTable.length - 1]

  // If a trump card is already played, user already lost the hand so any card of current suit is valid
  if (
    !(trumpCardsOnTable.length && suit !== trump) &&
    suitCardsRemaining[suitCardsRemaining.length - 1] > highestSuitCardOnTable
  )
    return getSuit(card) === suit && card > highestSuitCardOnTable

  return getSuit(card) === suit
}

export const getCardValidationMap = (
  suit: number,
  cardsRemaining: number[],
  cardsOnTable: CardsOnTableDataType,
  trump = 0,
) => {
  const cardsOnTableArr = Object.values(cardsOnTable).sort((a, b) => a - b)

  const suitCardsRemaining = cardsRemaining.filter(
    (remainingCard) => getSuit(remainingCard) === suit,
  )

  const trumpCardsRemaining = cardsRemaining.filter(
    (remainingCard) => getSuit(remainingCard) === trump,
  )

  const suitCardsOnTable = cardsOnTableArr.filter(
    (remainingCard) => getSuit(remainingCard) === suit,
  )

  const trumpCardsOnTable = cardsOnTableArr.filter(
    (remainingCard) => getSuit(remainingCard) === trump,
  )

  return cardsRemaining.map(
    (card) =>
      !cardsOnTableArr.length ||
      checkIfValidCard(
        card,
        suit,
        suitCardsOnTable,
        suitCardsRemaining,
        trumpCardsOnTable,
        trumpCardsRemaining,
      ),
  )
}

export function getMedalSrc(position: number) {
  switch (position) {
    case 1:
      return [goldMedal, 'gold-medal']
    case 2:
      return [silverMedal, 'silver-medal']
    case 3:
      return [bronzeMedal, 'bronze-meal']
    default:
      return [undefined, undefined]
  }
}

export function getOrdinalSuffixOf(i: number) {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return 'st'
  }
  if (j === 2 && k !== 12) {
    return 'nd'
  }
  if (j === 3 && k !== 13) {
    return 'rd'
  }
  return 'th'
}

export const updateKeys = (
  dispatch: ThunkDispatch<any, any, AnyAction>,
  keys: RefetchKeyType[],
) => {
  keys.forEach((key) => dispatch(refetchActions.setValue(key)))
}

export const initiateRefetch =
  (...keys: RefetchKeyType[]) =>
  async <T, U>(
    _: T,
    {
      dispatch,
      queryFulfilled,
    }: MutationLifecycleApi<
      T,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
      U,
      'api'
    >,
  ) => {
    try {
      await queryFulfilled
      updateKeys(dispatch, keys)
    } catch (err) {
      // digest error
    }
  }

export function getAllowedImageExtensions() {
  return '.jpeg, .jpg, .png, .gif'
}
