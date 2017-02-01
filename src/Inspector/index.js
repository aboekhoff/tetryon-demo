import React from 'react'
import ReactDOM from 'react-dom'
import { Inspector } from './components'

export default class UI {
  constructor(content = {}, options = {}) {
    this.root = options.root

    if (!this.root) {
      this.root = document.createElement('div')
      document.body.appendChild(this.root)
    }

    this.content = content || {}

    this.onChange = () => {
      this.render()
    }

    this.render()
  }

  setContent(content) {
    this.content = content
    this.render()
  }

  render() {
    const { content, onChange, root } = this
    const component = (
      <Inspector content={content} onChange={onChange}/>
    )
    ReactDOM.render(component, root)
  }
}
