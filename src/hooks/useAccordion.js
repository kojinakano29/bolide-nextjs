import { useEffect, useRef, useState } from 'react'

const openingKeyFrames = elementHeight => {
    return [
        {
            height: '0px',
            offset: 0,
        },
        {
            height: `${elementHeight}px`,
            offset: 0.999,
        },
        {
            height: 'auto',
            offset: 1,
            paddingBottom: '16px',
        },
    ]
}

const closingKeyFrames = elementHeight => {
    return [
        {
            height: 'auto',
            offset: '0',
        },
        {
            height: `${elementHeight}px`,
            offset: '0.001',
        },
        {
            height: '0px',
            offset: '1',
            paddingBottom: '0px',
        },
    ]
}

const option = {
    duration: 300,
    easing: 'ease',
    fill: 'forwards',
}

const useAccordion = ({ def } = {}) => {
    const accordionRef = useRef(null)
    const [isOpen, setIsOpen] = useState(def)

    useEffect(() => {
        const element = accordionRef.current
        if (element === null) return
        if (element.firstElementChild === null) return
        const elementHeight = element.clientHeight
        const elementChildHeight = element.firstElementChild.clientHeight

        if (isOpen) {
            element.animate(openingKeyFrames(elementChildHeight), option)
        } else {
            if (elementHeight > 0) {
                element.animate(closingKeyFrames(elementChildHeight), option)
            }
        }
    }, [isOpen])

    return {
        isOpen,
        setIsOpen,
        accordionRef,
    }
}

export default useAccordion
