import React, { PropTypes } from 'react'
import classnames from 'classnames'

export default class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: !!props.open,
    }
  }

  toggle() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state

    return (
      <div className="accordion">
        <div className="accordion-label">
          <span className="accordion-toggle" onClick={this.toggle.bind(this)}>
            { open ? '\u25BC' : '\u25B6' }
          </span>
          {this.props.title}
        </div>
        <div className={classnames('accordion-content', {open})}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Accordion.propTypes = {
  children: PropTypes.node,
  title: PropTypes.any,
}
