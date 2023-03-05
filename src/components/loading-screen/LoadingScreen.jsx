import './LoadingScreen.css'

export default function LoadingScreen({ loadingMessage }) {
    return (
        <div class="loading-screen">
            <span>{ loadingMessage }</span>
        </div>
    )
}