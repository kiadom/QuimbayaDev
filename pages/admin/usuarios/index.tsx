import Link from 'next/link'
import React from 'react'


const index = () => {
    return (
        <div>
           <div>Pagina de admin usuarios</div>
            <Link href='/'>
                <a className="cursor-pointer">Ir al Home</a>
            </Link>
        </div>
    )
}

export default index
