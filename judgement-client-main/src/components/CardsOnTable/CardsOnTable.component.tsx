import clsx from 'clsx'
import type { CurrentRoundDataType, GamePlayerIdsType } from '@Models/GameModels/Game'
import cards from '@Containers/GamePlay/cards'
import { useStyles } from './styles'

interface CardsOnTableProps {
  currentRound: Partial<CurrentRoundDataType>
  playerIds: GamePlayerIdsType
}

export function CardsOnTable({ playerIds, currentRound }: CardsOnTableProps) {
  const { classes } = useStyles()

  const cardsOnTableClasses = [
    classes.cardPlayerZero,
    classes.cardPlayerOne,
    classes.cardPlayerTwo,
    classes.cardPlayerThree,
  ]

  const cardsOnTable = playerIds.map((playerId) =>
    currentRound.cardsOnTable && playerId ? cards[currentRound.cardsOnTable[playerId]] : undefined,
  )

  if (currentRound?.state !== 'playing' || !cardsOnTable.length) return null

  return (
    <>
      {cardsOnTable.map((card, i) =>
        card ? (
          <img
            src={card.image}
            alt={`played-card-${card.suit}-${card.value}`}
            key={`played-card-${card.id}`}
            className={clsx(classes.playedCard, cardsOnTableClasses[i])}
          />
        ) : null,
      )}
    </>
  )
}
