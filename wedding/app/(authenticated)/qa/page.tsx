"use client" // VERY IMPORTANT!
import questionAnswer from '../../dataTemplates/qa.json'
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';
import "./qa.css"

type QuestionAnswer = {
    "question": string,
    "answer": string
}

const QAItems = () =>
   ( <Accordion.Root className="AccordionRoot pt-4" type="single" defaultValue="" collapsible>
        {
            questionAnswer.qa.map(
            (qaItem: QuestionAnswer, key) => (
                <Accordion.Item className="AccordionItem" value={`item-${key}`}>
                    <Accordion.Header className="AccordionHeader">
                        <Accordion.Trigger
                            className={`AccordionTrigger`}
                        >
                            <div className=" pl-4">

                                <span className="pr-2 title is-4">
                                {qaItem.question}
                            </span>
                                <span>
                                <FaChevronDown className="AccordionChevron title is-5" aria-hidden/>
                            </span>
                            </div>

                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                        className="panel-block body-1 subtitle is-5"
                    >
                        <div className="AccordionContentText">{qaItem.answer}</div>
                    </Accordion.Content>
                </Accordion.Item>
            ))
        }
    </Accordion.Root>
   )




function QAPage(){
    return(
        <>
            <div className={`tile px-5 pt-2 pb-3`}>
                <div className={`tile is-vertical is-parent`}>
                    <div className={`tile is-vertical is-child`}>
                        <div className={`has-text-centered title is-4`}>
                            Questions & Answers
                        </div>
                        <div className={`has-text-centered subtitle is-4`}>
                            Tap a question below to find the answer to that question.
                        </div>
                    </div>

                </div>
            </div>
            <div className={`container px-4 pb-4`}>
                <div className={`has-content-hcentered`}>
                    <QAItems/>
                </div>
            </div>
        </>
    )
}
export default QAPage;