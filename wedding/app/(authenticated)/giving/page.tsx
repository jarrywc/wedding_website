'use client'
import {FaAmazon} from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";

// https://www.amazon.com/wedding/registry/12VQ1HH6EYD5X
export default function Giving(){

    return (
        <>
            <div className='container p-1'>
                <h2 className='title is-2 has-text-centered'>How to Give to Bride & Groom</h2>
                <div className='tile is-ancestor'>
                    <div className='is-parent is-horizontal'>
                        <div className='tile is-child'>
                            <div className='box has-text-centered'>
                                <div className={`pb-2`}>
                                    <h4 className='title is-4'>
                                        Registry
                                    </h4>
                                </div>
                                <div className={`buttons`}>
                                    <h5 className='subtitle is-5' >
                                        <a className={`button is-light is-responsive is-medium`} href="https://www.amazon.com/wedding/registry/12VQ1HH6EYD5X">
                                            <FaAmazon size={`30`}/>
                                            <div className={`ps-2 m-2`}>Amazon Registry</div>
                                        </a>
                                    </h5>
                                    <div className={`content`}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}