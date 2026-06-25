import { useEffect, useState } from "react"

export const useOTPTimer = (initialSeconds = 60) => {
    const [seconds, setSeconds] = useState(initialSeconds)

    useEffect(() => {
        if (seconds === 0) return
        const timer = setTimeout(() => setSeconds(s => s - 1), 1000)
        return () => clearTimeout(timer)
    }, [seconds])

    const reset = () => setSeconds(initialSeconds)

    return { seconds, canResend: seconds === 0, reset }
}