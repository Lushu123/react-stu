import React from 'react'
import PropTypes from 'prop-types'

const Scroll = props => {
  return (
    <div>

    </div>
  )
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  click: true,
  refresh: PropTypes.bool,
  onScorll: PropTpes.func,
  pullUp: PropType.func,
  pullDown: PropTupe.func,
  pullUpLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bouceBottom: PropTypes.bool,
}

export default Scroll
