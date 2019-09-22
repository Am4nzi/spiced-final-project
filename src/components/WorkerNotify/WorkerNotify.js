import React , {useState, useEffect} from 'react'

const WorkerNotify = () => {
    const [prompt, setPrompt] = useState(null)
    useEffect(() => {
        if('serviceWorker' in navigator){
            window.addEventListener('beforeinstallprompt', e => {
                e.preventDefault()
                setPrompt(e)
            })
        }
    }, [])
    const installClickHandler = () => {
        prompt.prompt()
        prompt.userChoice.then(res => {
            if(res.outcome === "accepted"){
                setPrompt(null)
            }
        })
    }
    const renderInstallButton = () => {
        if(prompt){
            return <button 
            className="btn"
            onClick={installClickHandler}
            >USE AS APP</button>
        }
        return null
    }
    return(
        <>
            {renderInstallButton()}
        </>
    )
}

export default WorkerNotify