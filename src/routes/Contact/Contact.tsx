import {Typography, Input, InputLabel} from '@mui/material'
import {useState} from 'react'

export function Contact(){
const [name, setName] = useState('')
const [email, setEmail] = useState("")
const [message, setMessage] = useState("")
return(
<div>
<Typography>
Contact
</Typography>
<InputLabel>
Name
</InputLabel>
<Input
value={name}
onChange={(e, value)=>setName(value)}
/>
<InputLabel>
Email
</InputLabel>
<Input
label='Email'
value={email}
onChange={(e, value)=>setEmail(value)}
/>
<InputLabel>
Message
</InputLabel>
<Input
label='Message'
value={message}
multiline={true}
onChange={(e, value)=>setMessage(value)}
/>
</div>
)
}
