import express from'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.set('port',process.env.port || 8081)
app.listen(app.get('port'), () => {
  console.log(`Server is running ⚡️ at http://localhost:${app.get('port')}`)
});

export default app