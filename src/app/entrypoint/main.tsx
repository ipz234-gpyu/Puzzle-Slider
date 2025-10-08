import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../styles/index.css'
import {GamePage} from '@/pages/game'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GamePage/>
    </StrictMode>,
)
