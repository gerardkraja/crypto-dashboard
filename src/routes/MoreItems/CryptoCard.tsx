import { Card } from "@mui/material"

export function CryptoCard({ cryptoInfo }) {
  return (
    <Card>
      <div className={styles.cryptoButton}>
        <div className={styles.nameAndRank}>
          <Typography>{cryptoInfo.rank}</Typography>
          <Link to={`/cryptoDetails/${cryptoInfo.id}`}>
            <Typography>{cryptoInfo.name}</Typography>
          </Link>
        </div>
        <div className={styles.price}>
          <Typography>
            {`$${parseFloat(cryptoInfo.priceUsd).toFixed(2)}`}
          </Typography>
        </div>
        <div className={styles.changePercent}>
          {isFavoriteEnabled === true && (
            <FavoriteButton cryptoID={cryptoInfo.id} />
          )}
          {cryptoInfo.changePercent24Hr > 0 ? (
            <ArrowDropUpIcon color="success" />
          ) : (
            <ArrowDropDownIcon color="error" />
          )}
          <Typography>
            {parseFloat(cryptoInfo.changePercent24Hr).toFixed(2)}
          </Typography>
        </div>
      </div>
    </Card>
  )
}
