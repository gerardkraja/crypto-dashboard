import { Typography, Input, InputLabel } from "@mui/material"
import { useState } from "react"
import styles from "./Contact.module.css"

export function Contact() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  return (
    <div className={styles.page}>
      <Typography className={styles.title} variant="h4">
        Contact
      </Typography>
      <div>
        {/* <InputLabel>Name</InputLabel>
        <Input value={name} onChange={(e, value) => setName(value)} />
        <InputLabel>Email</InputLabel>
        <Input value={email} onChange={(e, value) => setEmail(value)} />
        <InputLabel>Message</InputLabel>
        <Input
          value={message}
          multiline={true}
          onChange={(e, value) => setMessage(value)}
        /> */}
      </div>
    </div>
  )
}
