'use client'

import UserClient from "@/app/ui/client/user";

export default function Landing({children}:{children?: React.ReactNode}){

    return(

        <main>
            <div className='container p-6 has-text-centered'>
                {/*<h1 className="title is-1">*/}
                {/*    Diana <p className={`is-hidden-touch`}>&</p> Jarred*/}
                {/*</h1>*/}
                {/*<h2 className='subtitle is-3'>*/}
                {/*    <div style={{fontStyle: 'italic'}}>*/}
                {/*        April 6th, 2024 • Roswell, GA*/}
                {/*    </div>*/}
                {/*</h2>*/}

                <h1 className="title is-1">
                    <span className={`is-hidden-mobile`}>Diana & Jarred</span>
                </h1>
                <h1 className="title is-1">
                    <span className={`is-hidden-tablet`}>Diana</span>
                </h1>
                <h1 className="subtitle is-1">
                    <span className={`is-hidden-tablet `}>&</span>
                </h1>
                <h1 className="title is-1">
                    <span className={`is-hidden-tablet`}>Jarred</span>
                </h1>
                <h2>
                    <span style={{fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-4`}>
                        April 6th, 2024
                    </span>
                    <span style={{fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-4`}> • </span>
                    <span style={{fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-4`}>
                        Roswell, GA
                    </span>
                    <div style={{fontStyle: 'italic'}} className={`is-hidden-tablet subtitle is-5`}>
                        April 6th, 2024 <br></br> Roswell, GA
                    </div>
                </h2>
            </div>
            <div className={`tile px-5 pt-2`}>
                <div className={`tile is-vertical is-parent`}>
                    <div className={`tile is-vertical is-child`}>
                        <div className={`has-text-centered title is-4 pb-4`}>
                            <div className={`is-hidden-mobile`}>
                                Welcome to our Wedding Site, <UserClient/>
                            </div>
                            <div className={`is-hidden-tablet`}>
                                <div>
                                    Welcome to our Wedding Site,
                                </div>
                                <div>
                                    <UserClient/>
                                </div>
                            </div>


                        </div>
                        {children}
                    </div>

                </div>
            </div>

        </main>
    )
}