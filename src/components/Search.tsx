import { Input, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"

//Input colors defined @ App.css
export function Search() {
  const navigate = useNavigate()

  return (
    <>
      <Input
        color="secondary"
        size="small"
        className="navbarInput"
        margin="none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search/${e.target.value}`)
            if (closeMobile) closeMobile()
          }
        }}
        sx={{
          width: { xs: "80%", sm: "80%", md: 200, lg: 200 },
          mx: { md: 1, lg: 1 },
          mt: { sm: 2, xs: 2 },
          input: { color: "white" },
        }}
        startAdornment={
          <InputAdornment className="navbarInputIcon" position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </>
  )
}
