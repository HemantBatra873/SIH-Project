import { Link } from "react-router-dom";

const Thanks = () => {
    return (
        <div className="flex h-screen items-center justify-center">
    <div>
        <div className="flex flex-col items-center space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-bold">Thank You !</h1>
            <p>Thank you can't wait for you to visit Us! Check your email for a link to the guide and your qr tickets.</p>
            <Link to='/home'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Home
                </button>
            </Link>
            
        </div>
    </div>
</div>
    )
}

export default Thanks;