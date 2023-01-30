import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const FooterLink = ({ children, link }) => {
  return (
    <Link to={link}>
      <Typography color="primary">{children}</Typography>
    </Link>
  )
}

export function Footer() {
  const footerItems = [
    { name: "Home", link: "/home" },
    { name: "Cryptos", link: "/more/cryptos" },
    { name: "Exchanges", link: "/more/exchanges" },
    { name: "Contact", link: "/contact" },
  ]
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        height: "6rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Crypto Dashboard
        </Typography>
        {footerItems.map((item) => {
          return (
            <FooterLink key={item.link} link={item.link}>
              {item.name}
            </FooterLink>
          )
        })}
      </div>

      <Typography color="primary">
        Crypto Dashboard is free software released under the MIT License.
      </Typography>
    </div>
  )
}
