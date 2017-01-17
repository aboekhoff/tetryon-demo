import React from 'react'
import ReactDOM from 'react-dom'
import * as components from './components'

export default class Inspector {
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
      <components.Inspector content={content} onChange={onChange}/>
    )
    ReactDOM.render(component, root)
  }
}
