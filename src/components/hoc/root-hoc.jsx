import React from 'react'

const RootHoc = (props) => {
    const { children } = props

    return (
        <>
            {children}
        </>
    )
}

export default RootHoc
