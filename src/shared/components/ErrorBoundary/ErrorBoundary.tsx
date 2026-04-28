import React from 'react'
import styles from './ErrorBoundary.module.scss'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; message: string }

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, message: '' }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, message: error.message }
    }

    componentDidCatch(error: Error) {
        console.error('ErrorBoundary caught:', error)
    }

    handleReset = () => {
        this.setState({ hasError: false, message: '' })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Что-то пошло не так</h2>
                    <p className={styles.message}>{this.state.message}</p>
                    <button className={styles.button} onClick={this.handleReset}>
                        Попробовать снова
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}
