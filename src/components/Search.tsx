import {Input, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom'

export function Search(){
const navigate = useNavigate()
return(
<>
<Input
size='small'
startAdornment={
<InputAdornment position='start'>
<SearchIcon />
</InputAdornment>
}
margin='none'
onKeyDown={(e)=>{
if(e.keyCode === 13){
navigate(`/search/${e.target.value}`)
}
}}
sx={{width:{xs: 100, sm: 100, md: 200}}}
/>
</>
)
}
