import {useSearchParams} from 'next/navigation'
import Link from "next/link";
import stories from "@/app/dataTemplates/stories.json"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Tabs, SubTab} from "@/types";
import React from "react";

export function useActiveTab() {
    const searchParams = useSearchParams()
    return  searchParams.get('tab') || "her_story";
}

export function TabContent({filter}: any){
    const tabs: Tabs[] = stories.tab_list
    return tabs?.filter(tab => tab.id === filter).map(
        (tab) => (
             <div className={`box content`}>
                <h4>{tab.tab_title}</h4>
                {tab.body.map(
                    (sub_body: SubTab) =>
                <>
                    <h5 className="title is-5">{sub_body?.title}</h5>
                    <span hidden={!sub_body?.body}>
                        <p className="subtitle is-5" >{sub_body?.body}</p>
                    </span>
                    <span hidden={!sub_body?.photos}>
                    <div className="slider">
                        <div className="slides">
                        {
                        sub_body?.photos?.map(
                    (img_str, index) =>
                        <>
                            <div id={`slide-${index}`} key={index}>
                                <img src={img_str} alt="EC1"/>
                            </div>
                        </>
                        )
                        }
                        </div>
                    </div>
                    </span>
                    <span hidden={!sub_body?.ordered_list}>
                    <div>
                    <ol>
                    {
                    sub_body?.ordered_list?.map(
                        (string, index) =>
                            <li key={index}>
                                {string}
                            </li>
                    )
                    }
                    </ol>
                    </div>
                    </span>
                    <span hidden={!sub_body?.unordered_list}>
                    <div>
                    <ul>
                    {
                        sub_body?.unordered_list?.map(
                            (string, index) =>
                                <li key={index}>
                                    {string}
                                </li>
                        )
                    }
                    </ul>
                    </div>
                    </span>
                </>
                )}
             </div>
        )
    )
}

export default function TabMenu() {
    const searchParams = useSearchParams()
    const tabs = stories.tab_list
    const tab_menu = tabs.map(
        (tab) =>
            (
                <li key={tab.id}
                    className={tab.id === searchParams.get('tab') ? `is-active` : ``}
                >
                    <Link href={`/ourstory/${tab.id}`}>{tab.tab_title}</Link>
                </li>
            )
    )

    return(
        <>
            <div className={`tabs px-3`}>
                <ul>
                {tab_menu}
                </ul>
            </div>
        </>
    )
}
