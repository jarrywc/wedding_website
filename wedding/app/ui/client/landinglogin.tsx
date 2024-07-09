// 'use client'
import Image from 'next/image'
import raven from "../../../public/photos/Raven_428.png"
export default function LandingLogin({children}:{children?: React.ReactNode}){
    return(

        <div className={`container is-fluid p-6 has-text-centered`}>
            <span>
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
                <h1 className="subtitle is-2">
                    <span className={``}>Wedding</span>
                </h1>


                {/*<h2>*/}
                {/*    <span style={{ fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-5`}>*/}
                {/*        April 6th, 2024*/}
                {/*    </span>*/}
                {/*    <span style={{ fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-4`}> • </span>*/}
                {/*    <span style={{ fontStyle: 'italic'}} className={`is-hidden-mobile subtitle is-5`}>*/}
                {/*        Roswell, GA*/}
                {/*    </span>*/}
                {/*    <div style={{ fontStyle: 'italic'}} className={`is-hidden-tablet subtitle is-6`}>*/}
                {/*        April 6th, 2024  <br></br> Roswell, GA*/}
                {/*    </div>*/}
                {/*</h2>*/}
            </span>
            <div>
                <span style={{borderBottom: "solid"}}>
                    <Image
                        src={raven}
                        width={428/2} height={599/2} alt="me"/>
                </span>
            </div>
            <div className={`tile is-ancestor px-5 pt-2`}>
                <div className={`tile is-vertical is-parent`}>
                    <div className={`tile is-vertical is-child`}>
                        <div className={`has-text-centered title is-4`}>Enter Phone Number to Access Site</div>
                        {/*{<div className={`has-text-centered subtitle is-6`}>xxx-xxx-xxxx</div>}*/}
                        {children}
                    </div>

                </div>
            </div>

        </div>
    )
}