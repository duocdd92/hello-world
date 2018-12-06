import React from 'react'
import { FILTER_TYPE } from '../../config/redux.jsx'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter={FILTER_TYPE.SHOW_ALL}>
      All
    </FilterLink>
    {', '}
    <FilterLink filter={FILTER_TYPE.SHOW_ACTIVE}>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter={FILTER_TYPE.SHOW_COMPLETED}>
      Completed
    </FilterLink>
  </p>
)

export default Footer