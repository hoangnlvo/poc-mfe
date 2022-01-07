import React, { Component } from "react";
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import {push} from 'react-router-redux'
import styled from 'styled-components'
import Radium from 'radium'
import Adapter from "./Adapter";

export default class Layout extends Component{

    render()
    {
        const Test = () => <Adapter importer={() => import("a/Increase")}/>
        return (
            <div>
                <div>hello im react 15</div>

                 <Test/>
            </div>
        )
    }
}