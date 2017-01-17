import React from 'react'
import Accordion from './Accordion'
import Instaform from './Instaform'
import classnames from 'classnames'
import { modules } from 'tetryon'
const keyboard = modules.input.keyboard

export default class Inspector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: !!props.open,
    }
    this.toggle = (e) => {
      if (e.which === (this.props.toggleKey || keyboard.ESC)) {
        this.setState({ open: !this.state.open })
      }
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.toggle)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggle)
  }

  render() {
    const { content, title } = this.props
    const { open } = this.state

    const inspectorContent = Object.keys(content).map(key => {
      return (
        <Instaform
          key={key}
          parent={content}
          path={key}
          value={content[key]}
        />
      )
    })

    return (
      <div className={classnames('inspector', {open})}>
        <Accordion title={title || 'Inspector'} open>
          {inspectorContent}
        </Accordion>
      </div>
    )
  }
}
