import {TabContent} from "@/app/ui/server/tabs";
import "./carousel.css";
import React from "react";
import Link from "next/link";
import Router from "next/router";

export default function OurStory() {
  return (
      <div className="columns px-3">
          <div className="column">
              <TabContent filter={`her_story`}/>
          </div>
          <div className="column">
              <TabContent filter={`his_story`}/>
          </div>
          <div className="column">
              <TabContent filter={`their_story`}/>
          </div>
      </div>
  )
}
