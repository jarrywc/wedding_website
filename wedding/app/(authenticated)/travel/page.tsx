"use client" // VERY IMPORTANT!

import {Columns, Heading, Card, Tile, Box, Container} from "react-bulma-components";
import Iframe from 'react-iframe'
import React from "react";
const maps_api_key = process.env.MAPS_API_KEY;

import "./travel.css"

const route_items = [
    { item: "Leave: First Baptist Church", sub_item: "124 Fake Church Street, Fakecity, GA 30324"},
        {item: "Climb into vehicle"},
        {item: "Tell autopilot address"},
        {item: "Watch a movie while car drives you"},
        {item: "Arrive in time for cocktail hour"},
        {item: "Arrive: Some River Club", sub_item: "234 Some Cool Venue, Coolcity, GA 30004"}
]

function RouteItem({props}: any){
    const { item, sub_item = undefined} = props
    if ( sub_item === undefined){return(<div className={`block`}>{item}</div>)}
    return(<div className={`block`}><div>{item}</div><em>{sub_item}</em></div>)
}

function RouteItems(){
// filter( page => page.i === access)
    const Items = route_items.map((it) => <RouteItem props={it}/>)
    return(Items)
}

export default function Travel(){
    return (
        <div className='container p-1'>
            <h2 className='title is-2 has-text-centered'>Travel</h2>
            <div className="box has-text-centered subtitle is-4">
                <p>
                    Below are maps for both ceremony & reception locations and a map for your journey from the ceremony
                    to
                    the reception.
                </p>
            </div>
            <div className='tile is-ancestor'>
                <div className='tile is-parent is-vertical'>
                    <div className='is-child pb-4'>
                    <div className='box has-text-centered'>
                            <div>
                                <h4 className='title is-4'>
                                    Wedding Ceremony
                                </h4>


                            </div>
                            <div>
                                <h5 className='subtitle is-5'>
                                    124 Fake Church Street, Fakecity, GA 30324
                                </h5>
                                <div className="google-maps">
                                    <Iframe

                                        frameBorder={0} styles={{border: 0}}
                                        width={`515`}
                                        height={`300`}
                                        loading={`lazy`}
                                        url=''
                                        src={`insert_url_here`}
                                        allowFullScreen/>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='is-child pb-4'>
                        <div className='box has-text-centered'>
                            <div>
                                <h4 className='title is-4'>
                                    Wedding Reception
                                </h4>
                            </div>
                            <div>
                                <h5 className='subtitle is-5'>
                                    234 Some Cool Venue, Coolcity, GA 30004
                                </h5>
                                <div className="google-maps">
                                    <Iframe

                                        frameBorder={0} styles={{border: 0}}
                                        url=''
                                        width={`515`}
                                        height={`300`}
                                        loading={`lazy`}
                                        src={`insert_url_here`}
                                        allowFullScreen/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='tile is-parent pb-4'>
                    <div className='tile is-child'>
                        <div className='box'>
                            <div className='has-text-centered pb-3'>
                                <h4 className='title is-4'>
                                    Route from Ceremony to Reception
                                </h4>
                            </div>
                            <div>
                                <div className={`block google-maps`}>
                                    <Iframe

                                        width='500'
                                        height="300"
                                        frameBorder={0} styles={{border: 0}}
                                        url=''
                                        src={`https://www.google.com/maps/embed/v1/directions?key=${maps_api_key}&ADD_DIRECTION_HERE`}
                                        allowFullScreen/>
                                </div>
                                <div className={`block has-text-centered`}>
                                    <div className={`content`}>
                                        <h4></h4>
                                        <>
                                            <RouteItems />
                                        </>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}