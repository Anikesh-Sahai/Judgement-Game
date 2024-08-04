import { useWindowSize } from '@Hooks/useWindowSize'
import { useThrowCardMutation } from '@Stores/index'
import type { CurrentRoundDataType, GamePlayerIdsType } from '@Models/GameModels/Game'
import cards from '@Containers/GamePlay/cards'
import { getCardValidationMap } from '@Utils/helpers'
import { useStyles } from './styles'

interface CardsRemainingProps {
  gameId: string
  currentRound: Partial<CurrentRoundDataType>
  playerIds: GamePlayerIdsType
}

export function CardsRemaining({ gameId, playerIds, currentRound }: CardsRemainingProps) {
  const { classes } = useStyles()

  const [windowWidth] = useWindowSize()
  const widthPercentage = (Math.sqrt(1600) / Math.sqrt(windowWidth)) * 8

  const [throwCard, { isLoading: isThrowingCard }] = useThrowCardMutation()

  const userId = playerIds.at(0)

  if (!gameId || !userId || !currentRound) return null

  const cardsRemaining = currentRound.cardsRemaining?.[userId]
    ? currentRound.cardsRemaining[userId]
    : []

  const isCardValid = getCardValidationMap(
    currentRound.currentChance?.suit ?? 0,
    cardsRemaining,
    currentRound.cardsOnTable ?? {},
  )

  const cardsAreaWidth = (75 * Math.sqrt(cardsRemaining.length)) / Math.sqrt(13)
  const leftMargin = (100 - cardsAreaWidth) / 2
  const zValue =
    cardsRemaining.length > 1 ? (cardsAreaWidth - widthPercentage) / (cardsRemaining.length - 1) : 0

  const curCards = cardsRemaining?.map((card) => cards[card])

  if (currentRound?.state !== 'playing' && currentRound?.state !== 'bidding') return null

  return (
    <>
      {curCards.map((card, i) =>
        currentRound.currentPlayerChanceTime?.userId === userId && isCardValid[i] ? (
          <button
            type='button'
            key={`card-button-${card.id}`}
            disabled={isThrowingCard}
            onClick={() => throwCard({ gameId, card: card.id })}
            style={{
              position: 'absolute',
              left: `${leftMargin + zValue * i}%`,
              top: '80%',
              width: `${widthPercentage}%`,
              transform: 'translate(0px, clamp(-20px, -6px - 2vh, -8px))',
            }}
            className={classes.cardBtn}
          >
            <img
              src={card.image}
              alt={`card-${card.suit}-${card.value}`}
              key={`card-${card.id}`}
              style={{
                width: '100%',
                boxShadow: 'rgba(256, 256, 256, 0.6) 0px 2px 4px',
                borderRadius: 'clamp(4px, 2px + 0.3vw, 6px)',
              }}
            />
          </button>
        ) : (
          <img
            src={card.image}
            alt={`card-${card.suit}-${card.value}`}
            key={`card-${card.id}`}
            style={{
              position: 'absolute',
              left: `${leftMargin + zValue * i}%`,
              top: '80%',
              width: `${widthPercentage}%`,
              filter: 'contrast(90%) brightness(90%)',
            }}
          />
        ),
      )}
    </>
  )
}
