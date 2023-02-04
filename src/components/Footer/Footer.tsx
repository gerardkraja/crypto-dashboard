import { Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

import styles from "./Footer.module.css"

interface Props {
  children: React.ReactNode
  link: string
}

const FooterLink = ({ children, link }: Props) => {
  return (
    <Link to={link}>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
    </Link>
  )
}

export function Footer() {
  const footerItems = [
    { name: "Home", link: "/home" },
    { name: "Cryptos", link: "/more/cryptos" },
    { name: "Exchanges", link: "/more/exchanges" },
    // { name: "Contact", link: "/contact" },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.links}>
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

      <Typography sx={{ textAlign: "center" }} color="primary">
        Crypto Dashboard is free software released under the MIT License.
      </Typography>
    </div>
  )
}
