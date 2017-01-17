import React, { PropTypes} from 'react'
import Accordion from './Accordion'

const BOOLEAN_OPTIONS = [['true', true], ['false', false]]

export default class Instaform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  renderWithLabel(label, node) {
    return (
      <div className="instaform-container">
        <div className="instaform-label">{label}</div>
        {node}
      </div>
    )
  }

  renderOptions(value, options) {
    return options.map(([rep, val], index) => {
      return (
        <option key={index} selected={val === value}>{rep}</option>
      )
    })
  }

  renderSelect(path, value, options) {
    return this.renderWithLabel(
      path,
      <select className="instaform-input">{this.renderOptions(value, options)}</select>
    )
  }

  renderNumericInput(path, value) {
    return this.renderWithLabel(
      path,
      <input
        className="instaform-input"
        value={this.state.value}
        onChange={(e) => this.setState(e.value)}
      />
    )
  }

  renderTextInput(path, value) {
    return this.renderWithLabel(
      path,
      <input
        className="instaform-input"
        value={this.state.value}
        onChange={(e) => this.setState({value: e.target.value})}
      />
    )
  }

  renderArray(path, value) {
    const content = value.map((subvalue, index) => {
      return (<Instaform
        key={index}
        parent={value}
        path={`${index}`}
        value={subvalue}
      />
      )
    })

    return (
      <Accordion title={path}>{content}</Accordion>
    )
  }

  renderObject(path, value, sort = false) {
    const keys = Object.keys(value || {})
    if (sort) keys.sort()
    let content = keys.map((key) => {
      return (
        <Instaform
          key={key}
          parent={value}
          path={key}
          value={value[key]}
        />
      )
    })

    return <Accordion title={path}>{content}</Accordion>
  }

  renderFunction(path, value, parent) {
    return (
      <div className="instaform-container">
        <div className="instaform-button" onClick={() => parent[path]()}>
          {path}
        </div>
      </div>
    )
  }

  render() {
    const { value, options, path, parent, constraints, sort } = this.props

    if (options) {
      return this.renderSelect(path, value, options)
    }

    if (typeof value === 'boolean') {
      return this.renderSelect(path, value, BOOLEAN_OPTIONS)
    }

    if (typeof value === 'number') {
      return this.renderNumericInput(path, value, constraints)
    }

    if (typeof value === 'string') {
      return this.renderTextInput(path, value)
    }

    if (typeof value === 'function') {
      return this.renderFunction(path, value, parent)
    }

    if (Array.isArray(value)) {
      return this.renderArray(path, value)
    }

    if (typeof value === 'object' || typeof value === 'undefined') {
      return this.renderObject(path, value, sort)
    }
  }
}

Instaform.propTypes = {
  value: PropTypes.any,
  options: PropTypes.array,
  parent: PropTypes.any,
  path: PropTypes.string,
  whitelist: PropTypes.array,
  blacklist: PropTypes.array,
  constraints: PropTypes.any,
}
