import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Link from "next/link";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <React.Fragment>
            <Link href="/student"
                  className='rounded-md px-3 py-2 text-xl font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>Student</Link>
            <Link href="/class"
                  className='rounded-md px-3 py-2 text-xl font-medium text-gray-600 hover:bg-gray-700 hover:text-white'>Class</Link>
            <div className="p-3"></div>
            <Component {...pageProps} />
        </React.Fragment>
    )
}
